export type NavItem = {
  label: string;
  href: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const navItems: NavItem[] = [
  { label: "品牌故事", href: "#story" },
  { label: "乐芬婴配", href: "#products" },
  { label: "NFP™", href: "#nfp" },
  { label: "关于我们", href: "#about" }
];

export const processSteps = [
  {
    title: "纯净液态奶源",
    body: "以液态奶源作为核心入料，减少复溶带来的营养流失与二次污染风险。"
  },
  {
    title: "高占比湿法工艺",
    body: "一、二段液态成粉率高达90%，三段液态成粉率高达98%，让配方更贴近鲜活状态。"
  },
  {
    title: "配方比例管理",
    body: "一、二段主料液态入料配比为4:1:1，三段调整为5:5:2，匹配不同月龄营养需求。"
  },
  {
    title: "原罐进口注册",
    body: "乐芬全系列通过中国婴儿配方奶粉新国标二次注册，原罐引进维利奥产品。"
  }
];

export const productStages = [
  {
    stage: "1段",
    age: "0-6月龄",
    copy: "为新生宝宝设计，强调温和亲和与基础营养支持。"
  },
  {
    stage: "2段",
    age: "6-12月龄",
    copy: "延续液态湿法工艺，适配辅食探索期的营养节奏。"
  },
  {
    stage: "3段",
    age: "12-36月龄",
    copy: "以幼儿成长为核心，采用更契合三段需求的液态入料配比。"
  }
];

export const faqItems: FaqItem[] = [
  {
    question: "什么是湿法工艺，相对干法的优势？",
    answer:
      "乐芬奶粉湿法工艺是液态奶一次性成粉，保证产品鲜活，减少二次污染风险，更接近母乳的口感。干法工艺经过基粉复溶，可能造成营养流失和变性。"
  },
  {
    question: "什么是稀奶油？",
    answer:
      "稀奶油源自鲜牛乳，富含优质脂肪酸，与母乳中的乳脂成分相似，有利于宝宝消化吸收。"
  },
  {
    question: "英文包装和中文包装有什么区别？",
    answer:
      "乐芬英文包装和中文包装都是芬兰 Valio 工厂原装进口。英文包装为线上跨境渠道专供。"
  },
  {
    question: "配料表怎么没有 OPO、DHA、ARA、卵磷脂？",
    answer:
      "乐芬配料表中可见添加珍稀稀奶油，稀奶油天然含有 OPO、乳脂球膜、ARA、卵磷脂等营养成分。"
  },
  {
    question: "如何辨别产品真伪？",
    answer:
      "每一罐产品都可查询到唯一对应的授权门店。请在正规门店渠道购买，并获取对应会员权益。"
  },
  {
    question: "为何全进口的乐芬使用中文标识？",
    answer:
      "中国法规规定在中国出售的婴幼儿配方奶粉必须使用中文标签。乐芬也希望中国消费者能更清晰了解产品科学性。"
  }
];

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!values.name.trim()) {
    errors.name = "请输入姓名";
  }

  if (!emailPattern.test(values.email.trim())) {
    errors.email = "请输入有效邮箱";
  }

  if (!values.message.trim()) {
    errors.message = "请输入咨询内容";
  }

  return errors;
}
