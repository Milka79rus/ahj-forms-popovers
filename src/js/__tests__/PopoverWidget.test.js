import { PopoverWidget } from "../PopoverWidget";

describe("PopoverWidget", () => {
  let widget;

  beforeEach(() => {
    document.body.innerHTML = `
      <button data-toggle="popover" data-title="Test Title" data-content="Test Content">Click</button>
    `;
    widget = new PopoverWidget();
    widget.init();
  });

  afterEach(() => {
    widget.destroy(); // Полностью убираем за собой слушатели и элементы
    document.body.innerHTML = "";
  });

  test("Popover should toggle visibility on click", () => {
    const button = document.querySelector('[data-toggle="popover"]');

    // 1. Первый клик — поповер должен появиться в DOM
    button.click();
    const popover = document.querySelector(".popover");
    expect(popover).toBeTruthy();
    expect(popover.querySelector(".popover-title").textContent).toBe(
      "Test Title",
    );
    expect(popover.querySelector(".popover-content").textContent).toBe(
      "Test Content",
    );

    // 2. Второй клик — поповер должен удалиться из DOM
    button.click();
    expect(document.querySelector(".popover")).toBeNull();
  });
});
