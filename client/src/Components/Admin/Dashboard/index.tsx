import React from "react";
import Sidebar from "../Sidebar";
import "./style.scss";
import { Link } from "react-router-dom";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from 'chart.js'
import { useGetDashboardDetailsQuery } from "../../../redux/api/userAPI";
import { useSelector } from "react-redux";
import { UserReducerInitialState } from "../../../types/reducer-types";

ChartJS.register(Tooltip, ArcElement, Legend);

const Dashboard: React.FC = () => {

    const { user } = useSelector((state: { userReducer: UserReducerInitialState }) => state.userReducer) || {};
    const { data } = useGetDashboardDetailsQuery(user?._id || "");

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [data?.outOfStock, data?.inStock],
            },
        ],
    };

    return (
        <div className="dashboard">
            <Sidebar />

            <div className="dashboardContainer">
                <h1>Dashboard</h1>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹ {data ? data?.totalAmount : '_'}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{data ? data?.productCount : '_'}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{data ? data?.orderCount : '_'}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{data ? data?.userCount : '_'}</p>
                        </Link>
                    </div>
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;