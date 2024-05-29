import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';

export type NavMenuItem = {
  name: string;
  icon?: IconDefinition;
  onClick: () => void;
};

type Props = {
  open: boolean;
  menuItems: NavMenuItem[];
  toggleOpen: (open: boolean) => void;
};

export default function NavMenu({ open, menuItems, toggleOpen }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setIsOpen(false);
          toggleOpen(false);
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef);

  const menuItemClick = (item: NavMenuItem) => {
    setIsOpen(false);
    toggleOpen(false);
    item.onClick();
  };

  return (
    <>
      {isOpen && (
        <div ref={wrapperRef} className="absolute right-0 top-11 flex flex-col w-[200px] bg-white shadow rounded border !border-gray-100">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center hover:bg-gray-200 h-12 px-4 py-2 cursor-pointer hover:text-dark-primary" onClick={() => menuItemClick(item)}>
              <div className="flex items-center">
                {item.icon && <FontAwesomeIcon icon={item.icon} style={{ width: 16, height: 16 }} />}
                <span className="pl-3">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
