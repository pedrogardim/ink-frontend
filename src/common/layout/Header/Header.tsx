import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiBell, mdiMenu, mdiMagnify, mdiClose } from "@mdi/js";
import { useSelector, useDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/userSlice";
import { setSearchValue } from "@/store/slices/uiSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const drawerController = useRef<HTMLInputElement>();

  const closeDrawer = () =>
    ((drawerController.current as HTMLInputElement).checked = false);

  useEffect(() => {
    closeDrawer();
  }, [closeDrawer, pathname]);

  const navItems = (
    <>
      {!pathname.includes("admin") && (
        <>
          {user && (
            <>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/appointments">My appointments</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/gallery">Artists</Link>
          </li>
        </>
      )}
      {pathname.includes("admin") && (
        <>
          <li>
            <Link to="/admin/users">Users</Link>
          </li>
          <li>
            <Link to="/admin/appointments">Appointments</Link>
          </li>
          <li>
            <Link to="/admin/tattooWorks">Tattoo works</Link>
          </li>
          <div className="relative ml-4">
            <Icon
              path={mdiMagnify}
              size={0.8}
              className="absolute top-2 left-2"
            />
            <input
              type="text"
              className="input input-bordered input-sm pl-7"
              onChange={(e) => dispatch(setSearchValue(e.target.value))}
            />
          </div>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none flex sm:hidden">
        <div className="drawer z-10">
          <input
            id="my-drawer"
            type="checkbox"
            className="drawer-toggle"
            ref={drawerController}
          />
          <div className="drawer-content">
            <label
              className="btn btn-square btn-ghost drawer-button"
              htmlFor="my-drawer"
            >
              <Icon path={mdiMenu} size={1} />
            </label>
          </div>
          <div className="drawer-side z-10">
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
              <li>
                <button
                  className="btn btn-ghost normal-case text-2xl"
                  onClick={closeDrawer}
                >
                  <Icon path={mdiClose} size={1} />
                </button>
              </li>
              <li>
                <Link className="text-2xl font-kenia" to="/">
                  Ink
                </Link>
              </li>
              {navItems}
            </ul>
          </div>
        </div>
      </div>
      <div className="">
        <Link className="btn btn-ghost normal-case text-2xl font-kenia" to="/">
          Ink
        </Link>
      </div>
      <ul className="menu menu-horizontal px-1 mr-auto hidden sm:flex">
        {navItems}
      </ul>
      {user && (
        <div className="flex-none ml-auto">
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
        <Link to="/login" className="btn btn-outline btn-primary ml-auto">
          Login
        </Link>
      )}
    </div>
  );
};
export default Header;
