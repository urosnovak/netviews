import SideMenu from "./SideMenu"
import "../css/CreatePanel.css"
import Tabs from "./core/Tabs";
import Tab from "./core/Tab";


const CreatePanel = () => {
    return (
        <div class="create-panel">
            <SideMenu />
            <Tabs>
                <Tab name="Tab 1">
                    <span>cao cao</span>
                    </Tab>
                    <Tab name="Tab 2">
                        <span>cao</span>
                    </Tab>
            </Tabs>
        </div>
    )
}

export default CreatePanel;