import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Lefin homepage", () => {
  it("shows the breastfeeding guidance modal when entering the homepage and allows dismissal", async () => {
    render(<App />);

    const user = userEvent.setup();
    const modal = screen.getByRole("dialog", { name: "母乳喂养提示" });

    expect(modal).toBeInTheDocument();
    expect(screen.getByText("母乳对宝宝来说是最好的食品")).toBeInTheDocument();
    expect(modal).toHaveTextContent("世界卫生组织建议纯母乳喂养至少");
    expect(modal).toHaveTextContent("至宝宝6个月");

    await user.click(screen.getByRole("button", { name: "关闭母乳喂养提示" }));

    expect(screen.queryByRole("dialog", { name: "母乳喂养提示" })).not.toBeInTheDocument();
  });

  it("renders the Apple-style single-page homepage structure", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "乐芬婴幼儿配方奶粉" })).toBeInTheDocument();
    expect(screen.getByText("科学湿法工艺，重构鲜活营养。")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "了解产品" })).toHaveAttribute("href", "#products");
    expect(screen.getByRole("link", { name: "查看 NFP 工艺" })).toHaveAttribute("href", "#nfp");
    expect(screen.getByRole("navigation", { name: "主导航" })).toBeInTheDocument();
    expect(screen.getByAltText("乐芬一段二段三段婴幼儿配方奶粉白底高级产品展示")).toHaveAttribute(
      "src",
      expect.stringContaining("hero-desktop-cutout.webp")
    );
    expect(screen.getByAltText("乐芬一段二段三段婴幼儿配方奶粉产品线横向展示")).toBeInTheDocument();
    expect(screen.getByAltText("鲜奶经过湿法工艺设备转化为奶粉的高端白底示意图")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Markdown 内容" })).toHaveAttribute("href", "/lefin-site.md");
  });

  it("opens the mobile navigation menu", async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "打开导航菜单" }));

    expect(screen.getByRole("dialog", { name: "移动端导航" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "关闭导航菜单" })).toBeInTheDocument();
  });

  it("expands FAQ answers and submits a valid contact form", async () => {
    render(<App />);

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "什么是 NFP™ Not From Powder？" }));
    await user.click(screen.getByRole("button", { name: "什么是 NFP™ Not From Powder？" }));
    expect(screen.getByText(/不从粉开始/)).toBeVisible();

    await user.type(screen.getByLabelText("姓名"), "张女士");
    await user.type(screen.getByLabelText("手机号码"), "13800138000");
    await user.selectOptions(screen.getByLabelText("选择咨询类型"), "产品咨询");
    await user.type(screen.getByLabelText("留言内容"), "想了解三段产品");
    await user.click(screen.getByRole("button", { name: "提交" }));

    expect(screen.getByText("留言已提交，我们会尽快联系您。")).toBeVisible();
  });
});
