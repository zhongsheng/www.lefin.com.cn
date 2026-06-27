import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Lefin homepage", () => {
  it("renders the selected science-led hero and core sections", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1, name: "拒绝复溶，重构鲜活" })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "主导航" })).toBeInTheDocument();
    expect(screen.getAllByText("NFP Not From Powder").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("高占比液态湿法工艺")).toBeInTheDocument();
    expect(screen.getByText("上海乐玢国际贸易有限公司")).toBeInTheDocument();
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
    await user.click(screen.getByRole("button", { name: "什么是稀奶油？" }));
    expect(screen.getByText(/源自鲜牛乳/)).toBeVisible();

    await user.type(screen.getByLabelText("姓名"), "张女士");
    await user.type(screen.getByLabelText("Email"), "parent@example.com");
    await user.type(screen.getByLabelText("咨询内容"), "想了解三段产品");
    await user.click(screen.getByRole("button", { name: "发送信息" }));

    expect(screen.getByText("信息已记录，我们会尽快联系您。")).toBeVisible();
  });
});
