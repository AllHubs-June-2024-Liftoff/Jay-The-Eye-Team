import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu, selectMenuItems, selectMenuStatus } from "../store/menuSlice";
import PlateList from "../components/plates/PlateList";


const Homepage = () => {
    const dispatch = useDispatch();
    const plates = useSelector(selectMenuItems);
    const menuStatus = useSelector(selectMenuStatus);

    // Fetch the menu only if the state is empty
    useEffect(() => {
        if (menuStatus === "idle") {
            dispatch(fetchMenu());
        }
    }, [menuStatus, dispatch]);

            <PlateList plates={plates} />
            {menuStatus === "loading" && <p>Loading...</p>}
            {menuStatus === "failed" && <p>Error loading menu.</p>}
        </div>
    );
};

export default Homepage;

