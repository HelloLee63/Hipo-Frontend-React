import { useEffect } from "react"
import { createPortal } from "react-dom";
import Icon from "../custom/icon";

const rootNode = document.querySelector('#root');
const modalsNode = document.querySelector('#modal-root');

export const Modal = ({ children, heading, closeHandler, fullscreen = false }) => {
    useEffect(() => {
        const keyboardHandler = (event) => {
            if (event.key === 'Escap') {
                closeHandler?.();
            }
        }

        document.addEventListener('keydown', keyboardHandler, false);

        if (rootNode) {
            rootNode.setAttribute('inert', 'true')
            rootNode.setAttribute('aria-hidden', 'true');
        }

        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', keyboardHandler, false)
            document.body.style.overflow = '';

            if (rootNode) {
                rootNode.removeAttribute('inert')
                rootNode.removeAttribute('aria-hidden')
            }
        }
    }, [])

    if (!modalsNode) return null;

    return createPortal(
        <section>
            <div>
               <head>
                   <div>{heading}</div>
                   <button>
                       <Icon />
                   </button>
               </head>
               <div>{children}</div>
            </div>
        </section>,
        modalsNode,
    )
}