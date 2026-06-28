import { describe, expect, it } from "vitest";
import { faqItems, navItems, productStages, validateContactForm } from "./siteContent";

describe("site content", () => {
  it("keeps the simplified Apple-style navigation labels in source order", () => {
    expect(navItems.map((item) => item.label)).toEqual([
      "乐芬婴配",
      "NFP工艺",
      "Valio奶源",
      "品牌承诺",
      "联系"
    ]);
  });

  it("keeps three product stages aligned to age ranges", () => {
    expect(productStages.map((item) => `${item.stage}:${item.age}`)).toEqual([
      "1段:0-6月龄",
      "2段:6-12月龄",
      "3段:12-36月龄"
    ]);
  });

  it("keeps FAQ coverage focused on product selection and use", () => {
    expect(faqItems).toHaveLength(4);
    expect(faqItems.map((item) => item.question)).toContain("什么是 NFP™ Not From Powder？");
    expect(faqItems.map((item) => item.question)).toContain("如何选择适合宝宝的段位？");
    expect(faqItems.map((item) => item.question)).toContain("开罐后如何保存？");
    expect(faqItems.map((item) => item.question)).toContain("冲调时需要注意什么？");
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
