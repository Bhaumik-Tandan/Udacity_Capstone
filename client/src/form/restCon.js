export function restCon(payload)
{
    const {model, longitude, latitude, average_cost_for_two, has_table_booking, has_online_delivery, is_delivering_now, switch_to_order_menu, price_range, votes, cuisines} = payload;
    const cuisinesParam = cuisines.join("%20");
    const url="https://wpgay7f1u9.execute-api.us-east-1.amazonaws.com/Prod/predict?";
    const params=`model=${model}&longitude=${longitude}&latitude=${latitude}&average_cost_for_two=${average_cost_for_two}&has_table_booking=${has_table_booking}&has_online_delivery=${has_online_delivery}&is_delivering_now=${is_delivering_now}&switch_to_order_menu=${switch_to_order_menu}&price_range=${price_range}&votes=${votes}&cuisines=${cuisinesParam}`;
    return fetch(url+params, {
        method: "GET",
           headers: {
               "Content-Type": "application/json"
           }
})
}