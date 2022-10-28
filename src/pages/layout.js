import { Outlet, Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { HiBookOpen, HiOutlineUserGroup, HiChevronLeft, HiPencil, HiMenu, HiOutlineUser, HiChevronRight } from 'react-icons/hi';
import styles from './navigation.module.css';





const Layout = () => {
    let [openState, setOpenState] = useState(false);
    let [currentPage, setCurrentPage] = useState("/MentorGuided");
    let [isSelfStudyActive, setSelfStudyActive] = useState();
    let [isMentorGuidedActive, setMentorGuidedActive] = useState();

    let location = useLocation();

    const iconActiveStyle = {
        borderStyle: "dotted",
        borderColor: "#8fb4f1",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    }

    const MenuToggle = () => {
        setOpenState(!openState);
    }

    const GetCurrentPage = () => {
        let path = location.pathname;
        setCurrentPage(path);
    }

    useEffect(() => {
        GetCurrentPage();
    }, [location.pathname])

    useEffect(() => {
        SetIconStyle();
    }, [currentPage])

    const SetIconStyle = () => {

        if (currentPage === "/SelfStudyMenu") {
            setSelfStudyActive(iconActiveStyle);
            setMentorGuidedActive(null);
        } else if (currentPage === "/MentorGuided") {
            setMentorGuidedActive(iconActiveStyle);
            setSelfStudyActive(null);
        } else {
            console.log("no valid path");
        }
    }

    const FullMenu = () => {
        return (
            <div className={styles.topBar}>
                <div className={styles.expandedMenu}>
                    <button className={styles.navButton}>
                        <div >
                            <Link to="/MentorGuided">< HiPencil className={styles.icon} /></Link>
                        </div>
                    </button>
                    <button className={styles.navButton}>
                        <div >
                            <Link to="/SelfStudyMenu">< HiMenu className={styles.icon} /></Link>
                        </div>
                    </button>
                    <button className={styles.navButton} onClick={MenuToggle}>
                        <div >
                            < HiChevronLeft className={styles.icon} />
                        </div>
                    </button>
                </div>

            </div>)
    }

    const ClosedMenu = () => {
        return (
            <div className={styles.miniTopBar}>
                <button className={styles.navButton} onClick={MenuToggle}>
                    <div>
                        < HiChevronRight className={styles.icon} />
                    </div>
                </button>
            </div>)
    }

    return (
        <>
            {openState ? <FullMenu /> : <ClosedMenu />}
            <div className={styles.leftBar}>
                <button className={styles.profileButton}>
                    <div >
                        <Link to="/MentorGuided">< HiOutlineUser className={styles.profileIcon} /></Link>
                    </div>
                </button>
                <button className={styles.navButton} style={isMentorGuidedActive}>
                    <div >
                        <Link to="/MentorGuided">< HiOutlineUserGroup className={styles.icon} /></Link>
                    </div>
                </button>
                <button className={styles.navButton} style={isSelfStudyActive}>
                    <div >
                        <Link to="/SelfStudyMenu">< HiBookOpen className={styles.icon} /></Link>
                    </div>
                </button>
            </div>

            <Outlet />
        </>
    )
};

export default Layout;