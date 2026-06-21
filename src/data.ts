export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  institution: string;
  description: string;
  iconName: string;
  color: string;
}

export interface InterestItem {
  id: number;
  title: string;
  category: string;
  description: string;
  bgGradient: string;
  iconName: string;
  specs: string[];
}

export interface QuoteItem {
  id: number;
  content: string;
  author: string;
  subtext: string;
}

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 1,
    year: "🎓 Đại học",
    title: "Thủ khoa đầu ra ngành CNTT",
    institution: "Đại học Thủ Dầu Một",
    description: "Tốt nghiệp xuất sắc chuyên ngành Công nghệ Thông tin, đạt thủ khoa xuất sắc với điểm số tối ưu và các đề tài sáng tạo.",
    iconName: "GraduationCap",
    color: "cyber-cyan"
  },
  {
    id: 2,
    year: "🏫 Tốt nghiệp",
    title: "Tốt nghiệp Đại học Thủ Dầu Một",
    institution: "Đại học Thử Dầu Một",
    description: "Nền tảng vững chắc về khoa học máy tính, thuật toán chuyên sâu, phát triển ứng dụng và kiến tạo hệ thống phần mềm.",
    iconName: "Award",
    color: "cyber-purple"
  },
  {
    id: 3,
    year: "👨‍🏫 Giảng dạy",
    title: "Trở thành giáo viên Tin học",
    institution: "Trung Tiểu Học Việt Anh 3",
    description: "Chính thức đứng lớp, mang nhiệt huyết tuổi trẻ truyền cảm hứng công nghệ, lập trình cơ bản và tư duy thuật toán cho các thế hệ học sinh.",
    iconName: "Presentation",
    color: "cyber-emerald"
  },
  {
    id: 4,
    year: "🚀 Sứ mệnh",
    title: "Đồng hành cùng học sinh khám phá công nghệ",
    institution: "Hành trình vô hạn",
    description: "Không chỉ truyền tải lý thuyết, mục tiêu lớn nhất là giúp học sinh làm quen với AI, phát triển tư duy sáng chế và tạo ra những ứng dụng thay đổi thế giới thực.",
    iconName: "Rocket",
    color: "cyber-blue"
  }
];

export const INTERESTS_DATA: InterestItem[] = [
  {
    id: 1,
    title: "Đá bóng",
    category: "⚽ THỂ THAO",
    description: "Yêu thích thể thao, tinh thần đồng đội và sự bền bỉ.",
    bgGradient: "from-amber-500/10 to-orange-500/10 hover:shadow-orange-500/10",
    iconName: "Activity",
    specs: ["Tốc độ", "Tinh thần đồng đội", "Bền bỉ", "Chiến thuật"]
  },
  {
    id: 2,
    title: "Du lịch",
    category: "🌍 KHÁM PHÁ",
    description: "Thích khám phá những vùng đất mới và trải nghiệm những điều khác biệt.",
    bgGradient: "from-blue-500/10 to-teal-500/10 hover:shadow-blue-500/10",
    iconName: "Map",
    specs: ["Địa điểm mới", "Văn hóa bản địa", "Chụp ảnh", "Trải nghiệm"]
  },
  {
    id: 3,
    title: "Công nghệ",
    category: "💻 NGHIÊN CỨU",
    description: "Luôn tò mò, học hỏi và cập nhật những xu hướng công nghệ mới.",
    bgGradient: "from-purple-500/10 to-pink-500/10 hover:shadow-purple-500/10",
    iconName: "Cpu",
    specs: ["Trí tuệ nhân tạo (AI)", "Thiết kế UI/UX", "Lập trình web", "Học máy (ML)"]
  }
];

export const QUOTES_DATA: QuoteItem[] = [
  {
    id: 1,
    content: "Không bao giờ nói KHÔNG BIẾT, mà chỉ nói là CHƯA BIẾT.",
    author: "Thầy Nguyễn Quốc Dũng",
    subtext: "Nếu hôm nay chưa biết, ngày mai sẽ biết. Chỉ cần không dừng bước."
  },
  {
    id: 2,
    content: "Mỗi lần bạn dũng cảm đặt câu hỏi cho những gì mình chưa biết, thì bạn đã tiến gần hơn 100 bước so với mục tiêu của mình.",
    author: "Tư duy phản biện",
    subtext: "Hỏi không phải là yếu kém, hỏi là khởi đầu của trí tuệ nhân tạo và con người."
  },
  {
    id: 3,
    content: "Đừng sợ hãi khi tiến bước chậm chạp, chỉ sợ khi bạn đứng yên.",
    author: "Học tập suốt đời",
    subtext: "Sự kiên trì đều đặn mỗi ngày làm nên lập trình viên vĩ đại."
  }
];

export const FLOATING_ICONS = [
  { icon: "Brain", color: "text-purple-400", label: "AI", x: "12%", y: "20%", delay: 0 },
  { icon: "Terminal", color: "text-cyan-400", label: "Code", x: "85%", y: "15%", delay: 1.5 },
  { icon: "Bot", color: "text-emerald-400", label: "Robot", x: "83%", y: "65%", delay: 0.8 },
  { icon: "Cpu", color: "text-amber-400", label: "Hardware", x: "18%", y: "75%", delay: 2.2 },
  { icon: "Cloud", color: "text-blue-400", label: "Cloud", x: "78%", y: "35%", delay: 1.2 },
  { icon: "Code2", color: "text-pink-400", label: "Dev", x: "10%", y: "45%", delay: 3 }
];
