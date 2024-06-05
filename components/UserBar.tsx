"use client";

import {useEffect, useRef, useState} from "react";
import clsx from "clsx";

const UserBar = () => {
    const userbarRef = useRef<any>(null);
    const [isActive, setIsActive] = useState<boolean>(false);
    useEffect(() => {
        const onClick = (e: any) => userbarRef.current.contains(e.target) || setIsActive(false);
        document.addEventListener("click", onClick);
        return () => document.removeEventListener("click", onClick);
    }, []);
    return (
        <div className={clsx('userbar', isActive && "active")} ref={userbarRef}>
            <div className="userbar__name" onClick={() => setIsActive(!isActive)}></div>
            <ul className="userbar__menu">
                <li className="userbar__menu_item">
                    Logout
                </li>
            </ul>
        </div>
    );
};

export default UserBar;
