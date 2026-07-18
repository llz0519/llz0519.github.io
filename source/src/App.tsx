import { useEffect, useRef, useState, useLayoutEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import Lenis from "lenis";
import { Navigation } from "@/components/Navigation";
import { CustomCursor } from "@/components/CustomCursor";
import { Home } from "@/pages/Home";
import { ProjectDetail } from "@/pages/ProjectDetail";
import { AlbumDetail } from "@/pages/AlbumDetail";
import { BlogDetail } from "@/pages/BlogDetail";

/**
 * ScrollToTop — 智能滚动管理
 *
 * 核心问题：HashRouter 使用 # 前缀，浏览器会把 #/life/xxx 中的内容
 * 误认为是页面锚点，自动滚动到 id="life" 的元素（Life section）。
 *
 * 解决方案：
 * 1. PUSH（点击进入新页面）→ 强制滚动到顶部，多次执行覆盖浏览器默认锚点滚动
 * 2. POP（点击返回按钮）→ 不干预，让 React Router 恢复之前的滚动位置
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useLayoutEffect(() => {
    if (navigationType === "PUSH") {
      // 强制滚动到顶部，使用多种方式确保覆盖浏览器和 Lenis 的默认行为
      const forceScrollTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        // 尝试重置 Lenis 内部状态
        if ((window as any).__lenis) {
          (window as any).__lenis.scrollTo(0, { immediate: true });
        }
      };

      // 立即 + RAF + setTimeout 多层防护
      forceScrollTop();
      requestAnimationFrame(() => {
        forceScrollTop();
        requestAnimationFrame(forceScrollTop);
      });
      setTimeout(forceScrollTop, 0);
      setTimeout(forceScrollTop, 50);
    }
    // POP 时完全不干预，React Router 会自动恢复之前的 scroll position
  }, [pathname, navigationType]);

  return null;
}

/**
 * RouteChangeHandler — 路由切换时的 Lenis 管理
 *
 * 在路由切换时停止/重启 Lenis，防止 Lenis 缓存旧页面的滚动位置
 * 影响新页面的滚动行为。
 */
function RouteChangeHandler({ lenisRef }: { lenisRef: React.MutableRefObject<Lenis | null> }) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;

    if (navigationType === "PUSH") {
      // 进入新页面：强制滚动到顶部
      lenis.scrollTo(0, { immediate: true });
    }
    // POP 时 Lenis 会自动处理平滑滚动到恢复的位置
  }, [pathname, navigationType, lenisRef]);

  return null;
}

function AppContent() {
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const isHome = location.pathname === "/";

  // Initialize Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // 暴露到 window 供 ScrollToTop 使用
    (window as any).__lenis = lenis;
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      (window as any).__lenis = null;
    };
  }, []);

  // Scroll spy (only on home page)
  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sections = ["about", "projects", "writing", "life"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  return (
    <div className="bg-black min-h-screen">
      <CustomCursor />
      <Navigation activeSection={isHome ? activeSection : ""} />
      <ScrollToTop />
      <RouteChangeHandler lenisRef={lenisRef} />
      <Routes>
        <Route path="/" element={<Home lenisRef={lenisRef} />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/life/:id" element={<AlbumDetail />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}

export default App;
