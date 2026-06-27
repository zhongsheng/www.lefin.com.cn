export type NavItem = {
  label: string;
  href: string;
};

export type ProcessStep = {
  title: string;
  body: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactFormValues = {
  name: string;
  phone: string;
  topic: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const navItems: NavItem[] = [
  { label: "品牌故事", href: "#story" },
  { label: "乐芬婴配", href: "#products" },
  { label: "NFP™", href: "#nfp" },
  { label: "关于我们", href: "#about" }
];

export const processSteps: ProcessStep[] = [
  {
    title: "优质奶源",
    body: "Valio芬兰自有牧场，鲜牛乳直供。"
  },
  {
    title: "低温净化",
    body: "低温过滤，保留天然活性。"
  },
  {
    title: "膜过滤浓缩",
    body: "多级膜过滤，提升浓度。"
  },
  {
    title: "低温均质",
    body: "温和均质，保护营养结构。"
  },
  {
    title: "低温喷雾干燥",
    body: "低温瞬时成粉，锁住鲜活营养。"
  },
  {
    title: "无菌冷却包装",
    body: "洁净灌装，安心保鲜。"
  }
];

export const heroMetrics = [
  {
    title: "不从粉起步",
    value: "NFP™",
    subtitle: "Not From Powder"
  },
  {
    title: "一二段液态成粉率",
    value: "高达90%",
    subtitle: "高占比液态工艺"
  },
  {
    title: "三段液态成粉率",
    value: "高达98%",
    subtitle: "重构鲜活"
  }
];

export const valioPoints = [
  { title: "自有牧场", body: "严格管理" },
  { title: "优质饲养", body: "天然纯净" },
  { title: "严控标准", body: "品质如一" },
  { title: "全程可追溯", body: "安心透明" }
];

export const productStages = [
  {
    stage: "1段",
    age: "0-6月龄",
    accent: "blue",
    points: ["温和易吸收", "助力自然舒适", "科学配比"]
  },
  {
    stage: "2段",
    age: "6-12月龄",
    accent: "green",
    points: ["营养进阶", "助力成长发育", "均衡配方"]
  },
  {
    stage: "3段",
    age: "12-36月龄",
    accent: "orange",
    points: ["营养全面", "助力活力成长", "多维营养组合"]
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "什么是NFP™（Not From Powder）？",
    answer:
      "NFP™ 表示不从粉开始，不通过基粉复溶再加工，而是以液态奶源高占比入料，一次性成粉，减少复溶带来的营养流失和二次污染风险。"
  },
  {
    question: "一二段液态成粉率90%，三段98%是什么意思？",
    answer:
      "这是指配方中液态原料直接参与成粉的比例。乐芬通过高占比液态湿法工艺，让不同段位都尽量保留鲜活奶源特点。"
  },
  {
    question: "乐芬奶粉真的拒绝复溶吗？",
    answer:
      "乐芬坚持高占比液态湿法工艺，减少基粉复溶路径，让产品从源头到成粉更贴近鲜活状态。"
  },
  {
    question: "乐芬奶粉的奶源来自哪里？",
    answer:
      "乐芬源自芬兰 Valio 奶源体系，依托自有牧场、质量监控和全程追溯，确保稳定纯净。"
  },
  {
    question: "为什么采用高占比液态湿法工艺？",
    answer:
      "湿法工艺能在液态阶段让营养均匀融合，减少干混和复溶步骤，更有利于配方均衡与品质稳定。"
  },
  {
    question: "如何选择适合宝宝的奶粉段位？",
    answer:
      "通常可按月龄选择：1段适合0-6月龄，2段适合6-12月龄，3段适合12-36月龄；具体喂养建议应结合宝宝实际情况咨询专业人士。"
  }
];

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const phonePattern = /^1[3-9]\d{9}$/;

  if (!values.name.trim()) {
    errors.name = "请输入姓名";
  }

  if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "请输入有效手机号";
  }

  if (!values.topic.trim()) {
    errors.topic = "请选择咨询类型";
  }

  if (!values.message.trim()) {
    errors.message = "请输入咨询内容";
  }

  return errors;
}
