export class PopoverWidget {
  constructor() {
    this.currentPopover = null;
    this.currentTrigger = null; // Запоминаем, какая кнопка открыла текущий поповер
    this._clickHandler = this._clickHandler.bind(this); // Фиксируем контекст для удаления слушателя
  }

  init() {
    document.addEventListener("click", this._clickHandler);
  }

  _clickHandler(e) {
    // Находим кнопку, даже если кликнули по вложенному тексту/тегу внутри неё
    const target = e.target.closest('[data-toggle="popover"]');

    if (target) {
      e.preventDefault();
      this.togglePopover(target);
    }
  }

  togglePopover(element) {
    // Если кликнули по той же самой кнопке — закрываем её поповер
    if (this.currentPopover && this.currentTrigger === element) {
      this.removePopover();
      return;
    }

    // Если открыт поповер от ДРУГОЙ кнопки — сносим старый перед созданием нового
    if (this.currentPopover) {
      this.removePopover();
    }

    const title = element.getAttribute("data-title") || "No title";
    const content = element.getAttribute("data-content") || "No content";

    const popoverElement = document.createElement("div");
    popoverElement.className = "popover";
    popoverElement.innerHTML = `
          <div class="popover-title">${title}</div>
          <div class="popover-content">${content}</div>
        `;

    document.body.appendChild(popoverElement);

    const { top, left } = element.getBoundingClientRect();
    const buttonWidth = element.offsetWidth;
    const popoverWidth = popoverElement.offsetWidth;
    const popoverHeight = popoverElement.offsetHeight;

    const buttonCenter = left + window.scrollX + buttonWidth / 2;
    const popoverLeft = buttonCenter - popoverWidth / 2;
    const popoverTop = top + window.scrollY - popoverHeight - 8;

    popoverElement.style.top = `${Math.round(popoverTop)}px`;
    popoverElement.style.left = `${Math.round(popoverLeft)}px`;

    this.currentPopover = popoverElement;
    this.currentTrigger = element; // Сохраняем ссылку на текущую активную кнопку
  }

  removePopover() {
    if (this.currentPopover) {
      this.currentPopover.remove();
      this.currentPopover = null;
      this.currentTrigger = null;
    }
  }

  // Метод для  очистки
  destroy() {
    document.removeEventListener("click", this._clickHandler);
    this.removePopover();
  }
}
