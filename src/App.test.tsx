import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("Lefin homepage", () => {
  it("renders the selected science-led hero and core sections", () => {
    render(<App />);

    expect(
      screen.getByRole("img", {
        name: "乐芬科学配方，陪伴成长每一步，一段二段三段婴幼儿配方奶粉产品展示"
      })
    ).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "主导航" })).toBeInTheDocument();
    expect(screen.getByText("400-8084066")).toBeInTheDocument();
    expect(screen.getByText("湿法工艺全流程，高占比液态成粉")).toBeInTheDocument();
    expect(screen.getByText("Valio芬兰奶源，纯净之源")).toBeInTheDocument();
    expect(screen.getByText("科学分段，精准满足成长所需")).toBeInTheDocument();
    expect(screen.getByAltText("乐芬一段婴儿配方奶粉 0-6月龄")).toBeInTheDocument();
    expect(screen.getByAltText("乐芬二段较大婴儿配方奶粉 6-12月龄")).toBeInTheDocument();
    expect(screen.getByAltText("乐芬三段幼儿配方奶粉 12-36月龄")).toBeInTheDocument();
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
    await user.click(screen.getByRole("button", { name: "什么是NFP™（Not From Powder）？" }));
    expect(screen.getByText(/不从粉开始/)).toBeVisible();

    await user.type(screen.getByLabelText("姓名"), "张女士");
    await user.type(screen.getByLabelText("手机号码"), "13800138000");
    await user.selectOptions(screen.getByLabelText("选择咨询类型"), "产品咨询");
    await user.type(screen.getByLabelText("请填写您的留言内容"), "想了解三段产品");
    await user.click(screen.getByRole("button", { name: "提交" }));

    expect(screen.getByText("留言已提交，我们会尽快联系您。")).toBeVisible();
  });
});
