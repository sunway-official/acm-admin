import React from 'react';
import { Component } from 'react';
//import Script from 'react-load-script';
import './css/component.css';
import './css/default.css';
import { images } from '../theme';
import Register from './section/register';

class LandingPage extends Component {
  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
  }

  handleScriptError() {
    this.setState({ scriptError: true });
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true });
  }
  render() {
    return (
      <div className="landingpage-body">
        <div className="container">
          <div className="cbp-af-header">
            <div className="cbp-af-inner">
              <h2>ACM</h2>
              <nav>
                <a href="" className="home">
                  Home
                </a>
                <a href="">Speaker</a>
                <a href="">Paper</a>
                <a href="">Contact Us</a>
                <button className="btn get-ticket">Get Ticket</button>
              </nav>
            </div>
          </div>
          <div className="main">
            <div>
              <img src={images.conference1} className="conference1" alt="" />
            </div>
            <section>
              <Register />
            </section>
            <section>
              <div>
                <p>
                  Cardigan gluten-free photo booth pug, occupy ethnic bicycle
                  rights disrupt ennui jean shorts art party raw denim Carles
                  Tonx artisan. Freegan aesthetic skateboard, forage iPhone ugh
                  umami tumblr McSweeney's chillwave biodiesel vinyl pitchfork
                  gentrify asymmetrical. Sartorial synth wayfarers, freegan pork
                  belly post-ironic ennui salvia direct trade shoreditch Wes
                  Anderson pitchfork. Mumblecore Truffaut american apparel,
                  Austin single-origin coffee post-ironic tofu retro Vice fanny
                  pack narwhal Neutra skateboard 90's. Kogi sartorial
                  post-ironic gentrify helvetica McSweeney's Schlitz, mustache
                  8-bit polaroid hella flexitarian viral kale chips tote bag.
                  Banh mi PBR typewriter Banksy. Beard messenger bag deep v,
                  keffiyeh lo-fi umami four loko vinyl lomo hoodie wolf banh mi.
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>
                  Artisan thundercats blog, VHS asymmetrical Schlitz whatever
                  High Life chambray semiotics synth. Mustache flannel
                  McSweeney's Carles gastropub put a bird on it. Occupy
                  Pinterest try-hard PBR Schlitz, biodiesel disrupt forage. +1
                  pop-up Tonx, Echo Park thundercats authentic try-hard. Mlkshk
                  pork belly artisan messenger bag raw denim cardigan Austin
                  Portland, bicycle rights tumblr blog you probably haven't
                  heard of them. Single-origin coffee seitan blog Williamsburg
                  mlkshk, leggings cred meggings selvage synth next level
                  McSweeney's pug 90's. Intelligentsia skateboard wolf,
                  pour-over cred gastropub bespoke kogi DIY synth 8-bit hella
                  dreamcatcher blog.
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>
                  Farm-to-table four loko narwhal tattooed salvia Etsy. Odd
                  Future craft beer pop-up, sustainable synth wayfarers
                  helvetica lomo forage freegan Banksy. Typewriter Williamsburg
                  direct trade, forage banh mi asymmetrical thundercats street
                  art you probably haven't heard of them actually freegan cred
                  chillwave mustache. Actually Pinterest gluten-free, roof party
                  gastropub you probably haven't heard of them blog. Pinterest
                  Odd Future post-ironic, Echo Park selfies narwhal bespoke
                  dreamcatcher american apparel iPhone raw denim. Selvage hella
                  mixtape, Neutra Etsy before they sold out YOLO art party
                  leggings Wes Anderson bespoke. Austin letterpress plaid kale
                  chips biodiesel Pinterest gastropub banjo ugh.
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>
                  Put a bird on it Schlitz tousled, pitchfork Odd Future tote
                  bag shabby chic vegan dreamcatcher Cosby sweater forage
                  cliche. IPhone locavore 8-bit photo booth wayfarers direct
                  trade blue bottle typewriter street art, trust fund pour-over
                  cred biodiesel tote bag. Banjo artisan lo-fi, photo booth
                  disrupt pitchfork banh mi hella wayfarers skateboard. Cardigan
                  irony Williamsburg pitchfork small batch put a bird on it
                  Terry Richardson Schlitz. Helvetica flannel banh mi hella,
                  food truck Pinterest freegan tofu post-ironic. Banksy Vice
                  four loko stumptown pour-over 8-bit biodiesel farm-to-table
                  scenester, keytar ethical tofu seitan craft beer trust fund.
                  Skateboard ennui cliche YOLO, art party Banksy 90's.
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>
                  Single-origin coffee vegan stumptown, cardigan selvage plaid
                  locavore fashion axe Neutra Echo Park. 90's thundercats swag
                  Odd Future ethical. Gastropub Wes Anderson next level ugh,
                  hella Schlitz Austin mixtape PBR pop-up master cleanse bicycle
                  rights tattooed kale chips Bushwick. Dreamcatcher pork belly
                  literally banh mi, blog vinyl food truck tattooed cornhole +1
                  pop-up. DIY hashtag fingerstache, thundercats master cleanse
                  Portland squid dreamcatcher keytar vinyl narwhal lomo cred
                  Neutra. Wolf 3 wolf moon plaid, craft beer YOLO Tonx literally
                  mlkshk selvage tumblr trust fund Godard seitan Carles
                  chambray. Tofu leggings intelligentsia tumblr, single-origin
                  coffee squid typewriter pork belly wayfarers hoodie Bushwick
                  shabby chic meh.
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>
                  90's banh mi small batch helvetica authentic, vegan wayfarers
                  vinyl meh hashtag. Pickled Tonx keffiyeh flannel gastropub,
                  locavore salvia art party literally try-hard blog. High Life
                  seitan banh mi Neutra, leggings swag you probably haven't
                  heard of them pug bicycle rights pour-over retro fixie
                  wayfarers Echo Park. Tofu vinyl pork belly, seitan kale chips
                  bitters fingerstache put a bird on it butcher church-key
                  occupy aesthetic DIY yr. Banjo dreamcatcher tumblr, actually
                  Carles typewriter roof party. Pug thundercats DIY, 90's
                  chambray gastropub actually intelligentsia Williamsburg Carles
                  disrupt shabby chic. Butcher Schlitz fanny pack 8-bit,
                  fingerstache occupy hoodie pug intelligentsia Carles
                  letterpress umami organic irony.
                </p>
              </div>
            </section>
            <section>
              <div>
                <p>
                  Food truck fap next level Odd Future sartorial craft beer
                  selvage 90's. Asymmetrical Schlitz hoodie street art jean
                  shorts squid. Locavore street art retro skateboard banjo,
                  post-ironic small batch keffiyeh yr +1. Selfies cardigan
                  sriracha Terry Richardson. Godard brunch kale chips, bespoke
                  photo booth retro Bushwick deep v farm-to-table polaroid
                  Williamsburg. Kogi biodiesel vinyl next level intelligentsia.
                  Skateboard Carles viral, Godard helvetica PBR butcher.
                </p>
              </div>
            </section>
          </div>
        </div>
        {/*<Script
          url="./cbpAnimatedHeader.min.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <Script
          url="./classie.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />*/}
      </div>
    );
  }
}
export default LandingPage;
