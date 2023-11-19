import { Link } from "react-router-dom";
import {
  mdiAccount,
  mdiCalendarRange,
  mdiHeartOutline,
  mdiLightningBolt,
  mdiPaletteOutline,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import { useSelector } from "@/store/hooks";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="page gap-y-8">
      <h1 className="text-3xl font-bold mr-auto">Home</h1>
      <h1 className="text-3xl font-bold">{`Welcome, ${user?.firstName}!`}</h1>
      <div className="relative">
        <span className="z-10 absolute w-full h-full flex justify-center items-center text-white font-bold text-2xl">
          Stats coming soon...
        </span>
        <div className="stats shadow opacity-40">
          <div className="stat">
            <div className="stat-figure text-primary">
              <Icon path={mdiLightningBolt} />
            </div>
            <div className="stat-title">Appointments</div>
            <div className="stat-value text-primary">12</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <Icon path={mdiHeartOutline} />
            </div>
            <div className="stat-title">Tattoo Works</div>
            <div className="stat-value text-secondary">23</div>
            <div className="stat-desc">21% more than last month</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <div className="avatar online">
                <div className="w-16 rounded-full">
                  <img src={user?.profilePicUrl} />
                </div>
              </div>
            </div>
            <div className="stat-value">86%</div>
            <div className="stat-title">Tasks done</div>
            <div className="stat-desc text-secondary">31 tasks remaining</div>
          </div>
        </div>
      </div>
      <div className="flex gap-x-4 flex-wrap justify-center">
        {user?.role !== "tattooist" && (
          <Link to="/appointments/new" className="btn btn-outline btn-primary">
            <Icon path={mdiPlus} size={1} />
            Ask for a appointment
          </Link>
        )}
        <Link to="/appointments" className="btn btn-outline btn-secondary">
          <Icon path={mdiCalendarRange} size={1} />
          See my appointments
        </Link>
        <div className="w-full h-0 m-0"></div>
        <Link to="/profile" className="btn btn-outline mt-4">
          <Icon path={mdiAccount} size={1} />
          My profile
        </Link>
        <Link to="/gallery" className="btn btn-outline btn-accent mt-4">
          <Icon path={mdiPaletteOutline} size={1} />
          Explore artists
        </Link>
      </div>
    </div>
  );
};

export default Home;
