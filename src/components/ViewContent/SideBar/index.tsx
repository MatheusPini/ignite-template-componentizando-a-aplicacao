import ISideBar from "../../Interfaces/ISideBar"
import "./style.scss"
export function SideBar({children}: ISideBar) {
  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {children}
        </div>

      </nav>
  )
}