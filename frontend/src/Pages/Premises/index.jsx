import Layout  from "../../Components/Layout"
import SliderComponent from "../../Components/SliderFilter"
import Restaurants from "../../Components/RestaurantsList"

function premises() {
    return (
        <Layout>
            <SliderComponent />
            <Restaurants />
        </Layout>
    )
}

export default premises