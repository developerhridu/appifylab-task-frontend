/* eslint-disable @next/next/no-img-element */
// Story row ported from feed.html — static/decorative.

const stories = ["mobile_story_img.png", "mobile_story_img1.png", "mobile_story_img.png", "mobile_story_img1.png", "mobile_story_img.png"];

export function StoriesRow() {
  return (
    <div className="_feed_inner_ppl_card _mar_b16">
      <div className="_feed_inner_ppl_card_area">
        <ul className="_feed_inner_ppl_card_area_list" style={{ display: "flex", gap: 12, listStyle: "none", padding: 16, margin: 0, overflowX: "auto" }}>
          <li className="_feed_inner_ppl_card_area_item">
            <a href="#0" className="_feed_inner_ppl_card_area_link">
              <div className="_feed_inner_ppl_card_area_story" style={{ position: "relative" }}>
                <div className="_feed_inner_ppl_btn">
                  <button className="_feed_inner_ppl_btn_link" type="button">+</button>
                </div>
              </div>
              <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
            </a>
          </li>
          {stories.map((s, i) => (
            <li key={i} className="_feed_inner_ppl_card_area_item">
              <a href="#0" className="_feed_inner_ppl_card_area_link">
                <div className="_feed_inner_ppl_card_area_story_active">
                  <img src={`/assets/images/${s}`} alt="Story" className="_card_story_img" />
                </div>
                <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
