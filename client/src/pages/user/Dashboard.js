import Layout from "../../components/Layout/Layout";
import "./styles.css";
import DashboardMenu from "../../components/Layout/DashboardMenu";

function Dashboard() {
    return (
        <Layout>
            <div className="user-dashboard-wrapper">
                <DashboardMenu/>
                <div className="user-dashboard-content">
                    <h1>Account Details</h1>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
