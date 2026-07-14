/* eslint-disable @next/next/no-img-element */
// Left sidebar ported from feed.html — static/decorative (no backend for these).

const explore = ["Learning", "Insights", "Find friends", "Bookmarks", "Group", "Gaming", "Settings", "Save post"];
const suggested = [
  { name: "Steve Jobs", role: "CEO of Apple", img: "people1.png" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "people2.png" },
  { name: "Dylan Field", role: "CEO of Figma", img: "people3.png" },
];

export function LeftSidebar() {
  return (
    <div className="_layout_left_sidebar_wrap">
      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_explore _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <h4 className="_left_inner_area_explore_title _title5 _mar_b24">Explore</h4>
          <ul className="_left_inner_area_explore_list">
            {explore.map((item) => (
              <li key={item} className="_left_inner_area_explore_item _explore_item">
                <a href="#0" className="_left_inner_area_explore_link">
                  <span style={{ display: "inline-block", width: 20, height: 20, marginRight: 12, borderRadius: 4, background: "#f0f2f5" }} />
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_suggest _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_area_suggest_content _mar_b24">
            <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
            <span className="_left_inner_area_suggest_content_txt">
              <a className="_left_inner_area_suggest_content_txt_link" href="#0">See All</a>
            </span>
          </div>
          {suggested.map((p) => (
            <div key={p.name} className="_left_inner_area_suggest_info">
              <div className="_left_inner_area_suggest_info_box">
                <div className="_left_inner_area_suggest_info_image">
                  <img src={`/assets/images/${p.img}`} alt={p.name} className="_info_img1" />
                </div>
                <div className="_left_inner_area_suggest_info_txt">
                  <h4 className="_left_inner_area_suggest_info_title">{p.name}</h4>
                  <p className="_left_inner_area_suggest_info_para">{p.role}</p>
                </div>
              </div>
              <div className="_left_inner_area_suggest_info_link">
                <a href="#0" className="_info_link">Connect</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="_layout_left_sidebar_inner">
        <div className="_left_inner_area_event _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
          <div className="_left_inner_event_content">
            <h4 className="_left_inner_event_title _title5">Events</h4>
            <a href="#0" className="_left_inner_event_link">See all</a>
          </div>
          {[0, 1].map((i) => (
            <div key={i} className="_left_inner_event_card">
              <div className="_left_inner_event_card_content">
                <div className="_left_inner_card_date">
                  <p className="_left_inner_card_date_para">10</p>
                  <p className="_left_inner_card_date_para1">Jul</p>
                </div>
                <div className="_left_inner_card_txt">
                  <h4 className="_left_inner_event_card_title">No more terrorism no more cry</h4>
                </div>
              </div>
              <hr className="_underline" />
              <div className="_left_inner_event_bottom">
                <p className="_left_iner_event_bottom">17 People Going</p>
                <a href="#0" className="_left_iner_event_bottom_link">Going</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
