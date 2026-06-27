import { describe, expect, it } from "vitest";
import { faqItems, navItems, validateContactForm } from "./siteContent";

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
    expect(faqItems.map((item) => item.question)).toContain("什么是湿法工艺，相对干法的优势？");
    expect(faqItems.map((item) => item.question)).toContain("如何辨别产品真伪？");
  });

  it("validates contact form fields before showing a success state", () => {
    expect(validateContactForm({ name: "", email: "bad", message: "" })).toEqual({
      name: "请输入姓名",
      email: "请输入有效邮箱",
      message: "请输入咨询内容"
    });

    expect(
      validateContactForm({
        name: "张女士",
        email: "parent@example.com",
        message: "想了解三段产品"
      })
    ).toEqual({});
  });
});
