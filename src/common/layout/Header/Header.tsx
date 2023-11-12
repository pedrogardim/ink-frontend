import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiBell, mdiMenu } from "@mdi/js";
import { useSelector, useDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Icon path={mdiMenu} size={1} />
        </button>
      </div>
      <div className="">
        <Link className="btn btn-ghost normal-case text-2xl font-kenia" to="/">
          Ink
        </Link>
      </div>
      <ul className="menu menu-horizontal px-1 mr-auto">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user && (
          <li>
            <a>My appointments</a>
          </li>
        )}
        <li>
          <a>Artists</a>
        </li>
        {/* <li tabIndex={0}>
          <details>
            <summary>Opciones</summary>
            <ul className="p-2">
              <li>
                <a>Submenu 1</a>
              </li>
              <li>
                <a>Submenu 2</a>
              </li>
            </ul>
          </details>
        </li> */}
      </ul>
      {user && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <Icon path={mdiBell} size={1} />
                <span className="badge badge-xs badge-primary indicator-item"></span>
              </div>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label
              tabIndex={0}
              className="btn btn-ghost btn-circle avatar ml-2"
            >
              <div className="w-10 rounded-full">
                <img
                  src={
                    user.profilePicUrl ||
                    `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}`
                  }
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => dispatch(logout())}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      {!user && (
        <Link to="/login" className="btn btn-outline btn-primary">
          Login
        </Link>
      )}
    </div>
  );
};
export default Header;
