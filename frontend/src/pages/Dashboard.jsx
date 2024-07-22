import ChatSection from '../components/ChatSection';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  return (
    <div className="container">
      <Sidebar/>
      <ChatSection/>
    </div>
  )
}

export default Dashboard;