export type NavItem = {
  label: string;
  href: string;
};

export type ProcessStep = {
  title: string;
  body: string;
  detail: string;
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

export const heroProofs = [
  { title: "科学分段", body: "覆盖 0-36 月龄关键成长阶段" },
  { title: "湿法工艺", body: "液态阶段融合核心营养" },
  { title: "芬兰奶源", body: "依托 Valio 奶源体系" },
  { title: "品质追溯", body: "批次信息以产品包装为准" }
];

export const navItems: NavItem[] = [
  { label: "品牌故事", href: "#story" },
  { label: "乐芬婴配", href: "#products" },
  { label: "NFP™", href: "#nfp" },
  { label: "关于我们", href: "#about" }
];

export const processSteps: ProcessStep[] = [
  {
    title: "优质奶源",
    body: "Valio芬兰自有牧场，鲜牛乳直供。",
    detail: "从源头建立稳定奶源基础。"
  },
  {
    title: "低温净化",
    body: "低温过滤，保留天然活性。",
    detail: "减少高温反复处理。"
  },
  {
    title: "膜过滤浓缩",
    body: "多级膜过滤，提升浓度。",
    detail: "为液态配伍提供浓缩基底。"
  },
  {
    title: "低温均质",
    body: "温和均质，保护营养结构。",
    detail: "让配方营养分布更均匀。"
  },
  {
    title: "低温喷雾干燥",
    body: "低温瞬时成粉，锁住鲜活营养。",
    detail: "缩短从液态到成粉路径。"
  },
  {
    title: "无菌冷却包装",
    body: "洁净灌装，安心保鲜。",
    detail: "包装密封守护稳定品质。"
  }
];

export const valioPoints = [
  { title: "自有牧场", body: "严格管理", detail: "源头牧场体系稳定可控" },
  { title: "优质饲养", body: "天然纯净", detail: "关注奶牛健康与饲养环境" },
  { title: "严控标准", body: "品质如一", detail: "多环节检测守住品质边界" },
  { title: "全程可追溯", body: "安心透明", detail: "从奶源到产品批次可追溯" }
];

export const valioHighlights = [
  "北纬纯净奶源带",
  "百年乳企 Valio 体系",
  "牧场到工厂链路管理"
];

export const productStages = [
  {
    stage: "1段",
    age: "0-6月龄",
    accent: "blue",
    summary: "适配新生宝宝初期营养需求，关注温和承接与日常喂养。",
    points: ["温和易吸收", "助力自然舒适", "科学配比"],
    tags: ["初生阶段", "温和配方", "日常营养"]
  },
  {
    stage: "2段",
    age: "6-12月龄",
    accent: "green",
    summary: "衔接辅食添加阶段，强化成长发育期所需的均衡支持。",
    points: ["营养进阶", "助力成长发育", "均衡配方"],
    tags: ["辅食衔接", "成长进阶", "均衡支持"]
  },
  {
    stage: "3段",
    age: "12-36月龄",
    accent: "orange",
    summary: "面向幼儿活力成长阶段，关注多维营养和日常饮食补充。",
    points: ["营养全面", "助力活力成长", "多维营养组合"],
    tags: ["幼儿阶段", "活力成长", "多维营养"]
  }
];

export const ratioHighlights = [
  {
    title: "蛋白结构",
    body: "围绕不同月龄消化特点设计乳清蛋白与酪蛋白比例。"
  },
  {
    title: "脂肪支持",
    body: "通过乳脂参与配方主料结构，提供成长所需能量基础。"
  },
  {
    title: "营养协同",
    body: "主料配比与维矿、活性营养等共同构成完整配方体系。"
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
  },
  {
    question: "开罐后应如何保存？",
    answer:
      "建议开罐后保持罐盖密封，置于阴凉干燥处，避免阳光直射和潮湿环境；开罐后的食用期限请以产品包装说明为准。"
  },
  {
    question: "冲调时需要注意什么？",
    answer:
      "冲调前请洗净双手并消毒器具，按照产品包装标注的水温、勺量和步骤操作，不建议自行加浓或稀释。"
  }
];

export const contactHighlights = [
  { title: "产品咨询", body: "段位选择、冲调方式、产品信息说明" },
  { title: "渠道合作", body: "经销合作、区域咨询、品牌资料对接" },
  { title: "售后支持", body: "包装信息、批次咨询、留言快速跟进" }
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
