console.clear();

/**
 * The following are imported from https://codepen.io/MrGrigri/pen/qBgYvXy.js: 
 * OutOfRangeError
 * elementIsValid, attributeExists, attribtueIsValid, attributeIsOneOf, valueIsNumber
 */

const SEPARATOR_KEY = "js-separator";
const SEPARATOR_CSS_VAR = "--js-primary-pane-size";
const MAIN_GRID_SELECTOR = "main_grid";
const MAIN_SEPARATOR_SELECTOR = "main_separator";
const DYNAMIC_WIDTH = 1200;

class Separator {
  static get EventNames() {
    return {
      ValueChange: "valuechange"
    };
  }

  static get #Defaults() {
    return {
      Min: 0,
      Max: 150,
      Value: 100,
      Step: 5
    };
  }

  static get #Selectors() {
    return {
      Host: "js-separator",
      Control: "js-separator-control",
      Controls: "js-separator-controls",
      Orientation: "js-separator-orientation",
      Label: "js-separator-label",
      Min: "js-separator-min",
      Max: "js-separator-max",
      Value: "js-separator-value",
      Step: "js-separator-step"
    };
  }

  static get #Attributes() {
    return {
      Role: "role",
      Min: "aria-valuemin",
      Max: "aria-valuemax",
      Value: "aria-valuenow",
      Orientation: "aria-orientation",
      Tabindex: "tabindex",
      Label: "aria-label",
      LabelledBy: "aria-labelledby",
      Controls: "aria-controls"
    };
  }

  static get #Orientations() {
    return {
      Vertical: "vertical",
      Horizontal: "horizontal"
    };
  }

  static get #Keys() {
    return {
      Up: "ArrowUp",
      Down: "ArrowDown",
      Left: "ArrowLeft",
      Right: "ArrowRight",
      Home: "Home",
      End: "End",
      Enter: "Enter"
    };
  }

  static get #ValidOrientations() {
    return [
      Separator.#Orientations.Vertical,
      Separator.#Orientations.Horizontal
    ];
  }

  #separatorRoleValue = "separator";

  #hostElement;
  #hostElementId;
  #controlElement;
  #controlsElement;
  #orientation;
  #min;
  #max;
  #value;
  #stepAmmount;

  #isMoving = false;
  #previousValue;
  #valueChangeEvent;

  constructor(hostElement) {
    this.#validateRequiredAttributes(hostElement);
    this.#validateOptionalAttributes();
    this.#validateControlsElement();
    this.#validateLabel();
    this.#validateParameters();
    this.#addAttributes();
    this.#addEvents();

    this.#previousValue = this.#value;
  }
  
  changeOrientation(orientation) {
    const orientationSelection = orientation === Separator.#Orientations.Vertical
      ? Separator.#Orientations.Vertical
      : Separator.#Orientations.Horizontal;
    
    this.#orientation = orientationSelection;
  }

  #validateRequiredAttributes(hostElement) {
    this.#hostElement = elementIsValid(hostElement);
    this.#hostElementId = attribtueIsValid(
      this.#hostElement,
      Separator.#Selectors.Host
    );
    this.#controlElement = elementIsValid(
      this.#hostElement.querySelector(`[${Separator.#Selectors.Control}]`)
    );
  }

  #validateLabel() {
    const attribute = attributeExists(
      this.#hostElement,
      Separator.#Selectors.Label
    );
    const labelElement = document.querySelector(`#${attribute}`);
    const labelValue = labelElement
      ? Separator.#Attributes.LabelledBy
      : Separator.#Attributes.Label;

    this.#controlElement.setAttribute(labelValue, attribute);
  }

  #validateControlsElement() {
    const attribute = attributeExists(
      this.#hostElement,
      Separator.#Selectors.Controls
    );
    this.#controlsElement = document.querySelector(`#${attribute}`);

    this.#controlElement.setAttribute(
      Separator.#Attributes.Controls,
      attribute
    );
  }

  #validateOptionalAttributes() {
    this.#orientation = attributeIsOneOf(
      Separator.#ValidOrientations,
      attribtueIsValid(
        this.#hostElement,
        Separator.#Selectors.Orientation
      )
    );
    this.#min =
      valueIsNumber(
        attributeExists(this.#hostElement, Separator.#Selectors.Min)
      ) || Separator.#Defaults.Min;
    this.#max =
      valueIsNumber(
        attributeExists(this.#hostElement, Separator.#Selectors.Max)
      ) || Separator.#Defaults.Max;
    this.#value =
      valueIsNumber(
        attributeExists(this.#hostElement, Separator.#Selectors.Value)
      ) || Separator.#Defaults.Value;
    this.#stepAmmount =
      valueIsNumber(
        attributeExists(this.#hostElement, Separator.#Selectors.Step)
      ) || Separator.#Defaults.Step;
  }

  #validateParameters() {
    if (this.#min >= this.#max) throw new OutOfRangeError(this.#min);
    if (this.#max <= this.#min) throw new OutOfRangeError(this.#max);
    if (this.#value > this.#max || this.#value < this.#min)
      throw new OutOfRangeError(this.#value);
  }

  #addAttributes() {
    this.#controlElement.setAttribute(
      Separator.#Attributes.Role,
      this.#separatorRoleValue
    );
    this.#controlElement.setAttribute(Separator.#Attributes.Min, this.#min);
    this.#controlElement.setAttribute(Separator.#Attributes.Max, this.#max);
    this.#controlElement.setAttribute(Separator.#Attributes.Value, this.#value);
    this.#controlElement.setAttribute(
      Separator.#Attributes.Orientation,
      this.#orientation
    );
    this.#controlElement.setAttribute(Separator.#Attributes.Tabindex, 0);
  }

  #getPrimaryPaneOffset(e) {
    const offset =
      this.#orientation === Separator.#Orientations.Vertical
        ? this.#controlsElement.offsetLeft
        : this.#controlsElement.offsetTop;
    const amount =
      this.#orientation === Separator.#Orientations.Vertical
        ? e.clientX
        : e.clientY;

    return amount - offset;
  }

  #shouldIncrease(key) {
    return key === Separator.#Keys.Down || key === Separator.#Keys.Right;
  }

  #shouldDecrease(key) {
    return key === Separator.#Keys.Up || key === Separator.#Keys.Left;
  }

  #increaseValue() {
    if (this.#value + this.#stepAmmount >= this.#max) {
      this.#dispatchValueChangeEvent(this.#max);
    } else {
      this.#dispatchValueChangeEvent(this.#value + this.#stepAmmount);
    }
  }

  #decreaseValue() {
    if (this.#value - this.#stepAmmount <= this.#min) {
      this.#dispatchValueChangeEvent(this.#min);
    } else {
      this.#dispatchValueChangeEvent(this.#value - this.#stepAmmount);
    }
  }

  #handleEnterKeydown() {
    if (this.#value === this.#min) {
      this.#dispatchValueChangeEvent(this.#previousValue);
    } else {
      this.#dispatchValueChangeEvent(this.#min);
    }
  }

  #handleHomeKeydown() {
    this.#dispatchValueChangeEvent(this.#min);
  }

  #handleEndKeydown() {
    this.#dispatchValueChangeEvent(this.#max);
  }

  #handleArrowKeydown(key) {
    if (this.#shouldIncrease(key)) {
      this.#increaseValue();
    } else if (this.#shouldDecrease(key)) {
      this.#decreaseValue();
    }
  }

  #handleKeyDownEvent = (e) => {
    const key = e.key;

    switch (key) {
      case Separator.#Keys.Enter:
        this.#handleEnterKeydown();
        break;
      case Separator.#Keys.Home:
        this.#handleHomeKeydown();
        break;
      case Separator.#Keys.End:
        this.#handleEndKeydown();
        break;
      default:
        this.#handleArrowKeydown(key);
        break;
    }
  };

  #handleMouseDownEvent = (e) => {
    if (e.button !== 0) return;
    
    e.preventDefault();

    this.#isMoving = true;

    document.addEventListener("mousemove", this.#handleMouseMoveEvent);
  };

  #handleMouseUpEvent = (e) => {
    if (this.#isMoving) {
      e.preventDefault();

      this.#isMoving = false;

      document.removeEventListener("mousemove", this.#handleMouseMoveEvent);
    }
  };
  
  #handleDblClickEvent = (e) => {
    this.#handleEnterKeydown();
  }

  #handleMouseMoveEvent = (e) => {
    if (this.#isMoving) {
      let offset = this.#getPrimaryPaneOffset(e);

      if (offset >= this.#max) {
        offset = this.#max;
      } else if (offset <= this.#min) {
        offset = this.#min;
      }

      this.#dispatchValueChangeEvent(offset);
    }
  };

  #addEvents() {
    this.#controlElement.addEventListener("keydown", this.#handleKeyDownEvent);
    this.#controlElement.addEventListener(
      "mousedown",
      this.#handleMouseDownEvent
    );
    this.#controlElement.addEventListener("dblclick", this.#handleDblClickEvent);
    document.addEventListener("mouseup", this.#handleMouseUpEvent);
  }

  #removeEvents() {
    this.#controlElement.removeEventListener(
      "keydown",
      this.#handleKeyDownEvent
    );
    this.#controlElement.removeEventListener(
      "mousedown",
      this.#handleMouseDownEvent
    );
    this.#controlElement.removeEventListener("dblclick", this.#handleDblClickEvent);
    document.removeEventListener("mouseup", this.#handleMouseUpEvent);
  }

  #dispatchValueChangeEvent(value) {
    this.#previousValue = this.#value;
    this.#value = value;
    this.#controlElement.setAttribute(Separator.#Attributes.Value, this.#value);

    const event = new CustomEvent(Separator.EventNames.ValueChange, {
      detail: {
        value: this.#value
      }
    });

    this.#hostElement.dispatchEvent(event);
  }
}

document.addEventListener(
  "DOMContentLoaded",
  (e) => {
    const uiEvent = new UIEvent('UIEvent', { view: window });
    const separators = document.querySelectorAll(`[${SEPARATOR_KEY}]`);
    const separatorInstances = new Map();
    const mainGridElement = document.querySelector(`#${MAIN_GRID_SELECTOR}`);
    const mainSeparatorInstance = document.querySelector(`#${MAIN_SEPARATOR_SELECTOR}`);
    const rootFontSize = parseInt(window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("font-size"), 10);

    const convertPixelsToRem = (pixels) => {
      return Number(pixels) / rootFontSize;
    };

    const handleSeparatorUpdate = ({ detail }) => {
      const value = detail.value;
      const valueInRems = convertPixelsToRem(value);

      mainGridElement.style.setProperty(SEPARATOR_CSS_VAR, `${valueInRems}rem`);
    };
    
    const updateSccVars = (orientation) => {
      const gridProps = ['area', 'columns', 'rows'];
      const separatorProps = ['border-outer', 'border-inner', 'width', 'height', 'cursor', 'top', 'left', 'translate', 'path'];
      
      gridProps.forEach(gridProp => {
        mainGridElement.style.setProperty(`--grid-${gridProp}`, `var(--grid-${gridProp}-${orientation})`)
      });
      
      separatorProps.forEach(separatorProp => {
        mainSeparatorInstance.style.setProperty(
          `--${separatorProp}`,
          `var(--${separatorProp}-${orientation})`
        )
      })
    }
    
    const handleWindowResize = (e) => {
      const windowSize = window.innerWidth;
      const orientation = windowSize <= DYNAMIC_WIDTH ? 'horizontal' : 'vertical';
      const separator = separatorInstances.get(MAIN_SEPARATOR_SELECTOR);
      
      updateSccVars(orientation);
      separator.changeOrientation(orientation);
    }

    separators.forEach((separator) => {
      try {
        const instance = new Separator(separator);
        const id = separator.getAttribute(`${SEPARATOR_KEY}`);

        separatorInstances.set(id, instance);

        separator.addEventListener(
          Separator.EventNames.ValueChange,
          handleSeparatorUpdate
        );
      } catch (err) {
        console.error(err);
      }
    });
    
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize(uiEvent);
  },
  false
);