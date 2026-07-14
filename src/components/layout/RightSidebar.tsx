"use client";

/* eslint-disable @next/next/no-img-element */
// Right sidebar ("Your Friends") ported from feed.html — static/decorative.

const friends = [
  { name: "Steve Jobs", role: "CEO of Apple", img: "people1.png", online: false, time: "5 minute ago" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "people2.png", online: true },
  { name: "Dylan Field", role: "CEO of Figma", img: "people3.png", online: true },
  { name: "Steve Jobs", role: "CEO of Apple", img: "people1.png", online: false, time: "5 minute ago" },
];

const OnlineDot = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
    <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
  </svg>
);

export function RightSidebar() {
  return (
    <div className="_feed_right_inner_area _padd_t24 _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
      <div className="_feed_right_inner_area_card_content _mar_b24">
        <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
        <span className="_feed_right_inner_area_card_content_txt">
          <a className="_feed_right_inner_area_card_content_txt_link" href="#0">See All</a>
        </span>
      </div>
      <form className="_feed_right_inner_area_card_form" onSubmit={(e) => e.preventDefault()}>
        <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
          <circle cx="7" cy="7" r="6" stroke="#666" />
          <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
        </svg>
        <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="input search text" aria-label="Search" />
      </form>

      {friends.map((f, i) => (
        <div key={i} className={`_feed_right_inner_area_card_ppl ${f.online ? "" : "_feed_right_inner_area_card_ppl_inactive"}`}>
          <div className="_feed_right_inner_area_card_ppl_box">
            <div className="_feed_right_inner_area_card_ppl_image">
              <img src={`/assets/images/${f.img}`} alt="" className="_box_ppl_img" />
            </div>
            <div className="_feed_right_inner_area_card_ppl_txt">
              <h4 className="_feed_right_inner_area_card_ppl_title">{f.name}</h4>
              <p className="_feed_right_inner_area_card_ppl_para">{f.role}</p>
            </div>
          </div>
          <div className="_feed_right_inner_area_card_ppl_side">{f.online ? <OnlineDot /> : <span>{f.time}</span>}</div>
        </div>
      ))}
    </div>
  );
}
