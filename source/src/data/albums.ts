// ============================================
// 生活相册数据 - 在这里添加你的相册和照片
// ============================================
// 每个相册会生成：
//   - 首页一个横向预览卡片
//   - 一个 /life/:id 详情页（照片 + 文字）
//
// 添加新相册：
//   1. 在 albums 数组末尾添加一个对象
//   2. 确保 id 唯一
//   3. 在 entries 中添加照片和文字
//   4. 图片放到 public/assets/ 目录下
//
// 每一组 photos + text 就是详情页中的一个段落：
//   - photos: 1-3 张照片（1张全宽 / 2-3张并排）
//   - text: 对应这段照片的文字描述
// ============================================

export interface AlbumEntry {
  photos: string[];   // 照片路径数组
  text: string;       // 对应这段照片的文字
}

export interface Album {
  id: string;
  title: string;           // 相册标题
  description: string;     // 相册简介
  coverImage: string;      // 封面图
  entries: AlbumEntry[];   // 照片+文字条目
}

export const albums: Album[] = [
  {
    id: "career-study",
    title: "career&study",
    description: "Coding sessions, research trips, and the journey of becoming a better engineer.",
    coverImage: "/images/2.%201.jpg",
    entries: [
      {
        photos: ["/images/2.%201.jpg", "/images/2.%202.jpg"],
        text: "北京之行，和 agent 实践的指导老师们合影。这次实践让我对 AI Agent 的实际应用有了更深的理解，从理论到落地，每一步都有老师们的耐心指导。",
      },
      {
        photos: ["/images/2.%203.jpg", "/images/2.%204.jpg"],
        text: "实践期间的点点滴滴。从模型调试到系统集成，每一张照片都记录着我们从零到一构建智能系统的过程。这些经历让我更加坚定了 AI 应用开发的方向。",
      },
    ],
  },
  {
    id: "my-life",
    title: "my life",
    description: "Food, travel, and the small joys of everyday life.",
    coverImage: "/images/life-4.jpg",
    entries: [
      {
        photos: ["/images/life-1.jpg", "/images/life-2.jpg", "/images/life-3.jpg"],
        text: "北京旅游时遇到的外国友人。旅途中最有趣的往往不是风景，而是偶然遇到的人。一次简单的交流，就能让一段旅程变得难忘。",
      },
      {
        photos: ["/images/life-4.jpg"],
        text: "港式茶餐厅的一餐。白切鸡、例汤、奶茶，简单却 satisfying。这种时候总觉得，幸福很多时候就是一顿好吃的饭。",
      },
      {
        photos: ["/images/life-5.jpg"],
        text: "太原理工东门的川菜馆。和朋友们聚餐的常驻据点，每次吃完都辣得直喝水，但下次还是会来。",
      },
      {
        photos: ["/images/life-6.jpg"],
        text: "东餐厅四楼的面。一碗热腾腾的面条，是忙碌一天后最好的慰藉。简单、暖胃、踏实。",
      },
    ],
  },
  {
    id: "moments-with-her",
    title: "moments with her",
    description: "The moments that matter most, with the one who matters most.",
    coverImage: "/images/3.1.jpg",
    entries: [
      {
        photos: ["/images/3.1.jpg", "/images/3.2.jpg", "/images/3.3.jpg"],
        text: "大二那年相遇，从此校园里的每个角落都有了新的意义。一起上课、一起吃饭、一起在图书馆熬到闭馆，这些看似平常的日子，因为有了她而变得格外珍贵。",
      },
      {
        photos: ["/images/3.4.jpg", "/images/3.5.jpg"],
        text: "她是我在 debug 到崩溃时的安慰，也是我取得一点进步时第一个想分享的人。在一起的每一天，都是值得记录的好天气。",
      },
    ],
  },
];

// 通过 id 查找相册
export function getAlbumById(id: string): Album | undefined {
  return albums.find((a) => a.id === id);
}
