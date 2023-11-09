import Icon from "@mdi/react";
import { mdiBell, mdiMenu } from "@mdi/js";

const Header = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <Icon path={mdiMenu} size={1} />
        </button>
      </div>
      <div className="">
        <a className="btn btn-ghost normal-case text-xl">Appointments Studio</a>
      </div>
      <ul className="menu menu-horizontal px-1 mr-auto">
        <li>
          <a>Home</a>
        </li>
        <li>
          <a>Mis citas</a>
        </li>
        <li>
          <a>Tatuadores</a>
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
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar ml-2">
            <div className="w-10 rounded-full">
              <img src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Header;
