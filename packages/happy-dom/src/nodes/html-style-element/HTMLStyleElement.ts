import CSSStyleSheet from '../../css/CSSStyleSheet.js';
import * as PropertySymbol from '../../PropertySymbol.js';
import HTMLElement from '../html-element/HTMLElement.js';
import Node from '../node/Node.js';

/**
 * HTML Style Element.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLStyleElement.
 */
export default class HTMLStyleElement extends HTMLElement {
	private [PropertySymbol.sheet]: CSSStyleSheet | null = null;

	/**
	 * Returns CSS style sheet.
	 *
	 * @returns CSS style sheet.
	 */
	public get sheet(): CSSStyleSheet {
		return this[PropertySymbol.sheet] ? this[PropertySymbol.sheet] : null;
	}

	/**
	 * Returns media.
	 *
	 * @returns Media.
	 */
	public get media(): string {
		return this.getAttribute('media') || '';
	}

	/**
	 * Sets media.
	 *
	 * @param media Media.
	 */
	public set media(media: string) {
		this.setAttribute('media', media);
	}

	/**
	 * Returns type.
	 *
	 * @returns Type.
	 */
	public get type(): string {
		return this.getAttribute('type') || '';
	}

	/**
	 * Sets type.
	 *
	 * @param type Type.
	 */
	public set type(type: string) {
		this.setAttribute('type', type);
	}

	/**
	 * Returns disabled.
	 *
	 * @returns Disabled.
	 */
	public get disabled(): boolean {
		return this.getAttribute('disabled') !== null;
	}

	/**
	 * Sets disabled.
	 *
	 * @param disabled Disabled.
	 */
	public set disabled(disabled: boolean) {
		if (!disabled) {
			this.removeAttribute('disabled');
		} else {
			this.setAttribute('disabled', '');
		}
	}

	/**
	 * @override
	 */
	public override [PropertySymbol.appendChild](node: Node): Node {
		const returnValue = super[PropertySymbol.appendChild](node);
		if (this[PropertySymbol.sheet]) {
			this[PropertySymbol.sheet].replaceSync(this.textContent);
		}
		return returnValue;
	}

	/**
	 * @override
	 */
	public override [PropertySymbol.removeChild](node: Node): Node {
		const returnValue = super[PropertySymbol.removeChild](node);
		if (this[PropertySymbol.sheet]) {
			this[PropertySymbol.sheet].replaceSync(this.textContent);
		}
		return returnValue;
	}

	/**
	 * @override
	 */
	public override [PropertySymbol.insertBefore](newNode: Node, referenceNode: Node | null): Node {
		const returnValue = super[PropertySymbol.insertBefore](newNode, referenceNode);
		if (this[PropertySymbol.sheet]) {
			this[PropertySymbol.sheet].replaceSync(this.textContent);
		}
		return returnValue;
	}

	/**
	 * @override
	 */
	public override [PropertySymbol.connectedToDocument](parentNode: Node): void {
		super[PropertySymbol.connectedToDocument](parentNode);
		if (this[PropertySymbol.isConnected]) {
			this[PropertySymbol.sheet] = new CSSStyleSheet();
			this[PropertySymbol.sheet].replaceSync(this.textContent);
		}
	}

	/**
	 * @override
	 */
	public override [PropertySymbol.disconnectedFromDocument](parentNode: Node): void {
		super[PropertySymbol.disconnectedFromDocument](parentNode);
		this[PropertySymbol.sheet] = null;
	}
}
