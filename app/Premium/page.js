import React from 'react'

export default function page() {
    return (
        <div className="premium">
            <div className="premium-section">
                    <img className="premium-logo" src="https://www.redditstatic.com/desktop2x/img/reddit_premium_landing.png" alt="Reddit premium logo" />
                <h4 className="support">Help support Reddit and get VIP treatment and exclusive access.</h4>
                <div className="btn-container">
                    <button role="button" tabindex="0" className="premium-btn1">$5.99/Month</button>
                    <button role="button" tabindex="0" className="premium-btn2">$49.99/Year<span className="premium-save">Save 30%</span></button>
                </div>
                <p className="premiun-subscription">Subscriptions automatically renew</p>
            </div>
        </div>
    )
}
