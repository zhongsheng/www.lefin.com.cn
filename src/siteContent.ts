export type NavItem = {
  label: string;
  href: string;
};

export type StageItem = {
  stage: string;
  age: string;
  name: string;
  summary: string;
};

export type FeatureItem = {
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
  { label: "乐芬婴配", href: "#products" },
  { label: "NFP工艺", href: "#nfp" },
  { label: "Valio奶源", href: "#source" },
  { label: "品牌承诺", href: "#promise" },
  { label: "联系", href: "#contact" }
];

export const heroContent = {
  title: "乐芬婴幼儿配方奶粉",
  subtitle: "科学湿法工艺，重构鲜活营养。",
  primaryCta: { label: "了解产品", href: "#products" },
  secondaryCta: { label: "查看 NFP 工艺", href: "#nfp" },
  alt: "乐芬一段二段三段婴幼儿配方奶粉白底高级产品展示"
};

export const breastfeedingNotice = {
  ariaLabel: "母乳喂养提示",
  intro: "母乳对宝宝来说是最好的食品",
  recommendation: ["世界卫生组织建议纯母乳喂养至少", "至宝宝6个月"],
  closeLabel: "关闭母乳喂养提示"
};

export const productStages: StageItem[] = [
  {
    stage: "1段",
    age: "0-6月龄",
    name: "婴儿配方奶粉",
    summary: "初生阶段，关注温和承接与日常营养。"
  },
  {
    stage: "2段",
    age: "6-12月龄",
    name: "较大婴儿配方奶粉",
    summary: "辅食衔接阶段，支持成长节律。"
  },
  {
    stage: "3段",
    age: "12-36月龄",
    name: "幼儿配方奶粉",
    summary: "幼儿活力阶段，补充多维营养。"
  }
];

export const productContent = {
  title: "三段科学分龄。",
  subtitle: "按月龄成长节律设计，让选择更清晰。",
  alt: "乐芬一段二段三段婴幼儿配方奶粉产品线横向展示"
};

export const nfpContent = {
  title: "不从粉起步。",
  subtitle: "高占比液态湿法工艺，让营养在液态阶段均匀融合。",
  alt: "鲜奶经过湿法工艺设备转化为奶粉的高端白底示意图"
};

export const nfpFeatures: FeatureItem[] = [
  {
    title: "液态融合",
    body: "核心营养在液态阶段参与配伍，减少复溶路径。"
  },
  {
    title: "温和成粉",
    body: "通过稳定工艺窗口，兼顾鲜活感与批次稳定。"
  },
  {
    title: "清晰追溯",
    body: "批次信息以产品包装为准，关键节点可追踪。"
  }
];

export const sourceContent = {
  title: "来自芬兰的纯净奶源。",
  subtitle: "依托 Valio 奶源体系，从牧场、原奶到工厂协同管理。",
  alt: "芬兰湖区草地与牛奶玻璃杯，象征乐芬奶源故事"
};

export const promiseItems: FeatureItem[] = [
  {
    title: "真实产品识别",
    body: "官网图片以乐芬现有包装为基础，保持段位、品牌和产品线识别。"
  },
  {
    title: "少一点复杂表达",
    body: "把工艺、奶源、分段逻辑讲短，保留家长真正需要判断的信息。"
  },
  {
    title: "服务持续在线",
    body: "产品咨询、段位选择、合作与售后问题，都可以通过官网入口触达。"
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "什么是 NFP™ Not From Powder？",
    answer:
      "NFP™ 表示不从粉开始，不通过基粉复溶再加工，而是强调液态原料高占比参与湿法成粉。"
  },
  {
    question: "如何选择适合宝宝的段位？",
    answer:
      "通常按月龄选择：1段适合0-6月龄，2段适合6-12月龄，3段适合12-36月龄；具体喂养建议请结合宝宝实际情况咨询专业人士。"
  },
  {
    question: "开罐后如何保存？",
    answer:
      "建议保持罐盖密封，置于阴凉干燥处，避免阳光直射和潮湿环境；食用期限请以产品包装说明为准。"
  },
  {
    question: "冲调时需要注意什么？",
    answer:
      "冲调前请洗净双手并消毒器具，按照产品包装标注的水温、勺量和步骤操作，不建议自行加浓或稀释。"
  }
];

export const contactTopics = ["产品咨询", "渠道合作", "售后服务"];

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
