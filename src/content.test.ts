import { describe, expect, it } from "vitest";
import { faqItems, navItems, processSteps, validateContactForm } from "./siteContent";

describe("site content", () => {
  it("keeps the official navigation labels in source order", () => {
    expect(navItems.map((item) => item.label)).toEqual([
      "品牌故事",
      "乐芬婴配",
      "NFP™",
      "关于我们"
    ]);
  });

  it("keeps source-aligned FAQ coverage", () => {
    expect(faqItems).toHaveLength(6);
    expect(faqItems.map((item) => item.question)).toContain("什么是NFP™（Not From Powder）？");
    expect(faqItems.map((item) => item.question)).toContain("如何选择适合宝宝的奶粉段位？");
  });

  it("models the six-step wet-process flow from the prototype", () => {
    expect(processSteps.map((step) => step.title)).toEqual([
      "优质奶源",
      "低温净化",
      "膜过滤浓缩",
      "低温均质",
      "低温喷雾干燥",
      "无菌冷却包装"
    ]);
  });

  it("validates contact form fields before showing a success state", () => {
    expect(validateContactForm({ name: "", phone: "123", topic: "", message: "" })).toEqual({
      name: "请输入姓名",
      phone: "请输入有效手机号",
      topic: "请选择咨询类型",
      message: "请输入咨询内容"
    });

    expect(
      validateContactForm({
        name: "张女士",
        phone: "13800138000",
        topic: "产品咨询",
        message: "想了解三段产品"
      })
    ).toEqual({});
  });
});
