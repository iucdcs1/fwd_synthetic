<script lang="ts">
    async function replacing(buttonId: string) {
    // Assuming '../review' is the base URL, append the buttonId as a URL parameter
    window.location.replace(`../review?button=${buttonId}`);
    }
    async function replacingbutton(buttonId: string) {
    // Assuming '../review' is the base URL, append the buttonId as a URL parameter
    window.location.replace(`../addreview?button=${buttonId}`);
  }
</script>

<div class="pagehome__main">
  <div class="pagehome__container1">
    <p class="pagehome__service">About service</p>
  </div>
  <div class="pagehome__container2">
    <div class="pagehome__container2header">
        <p class="pagehome__feedback">Review</p>
        <button class="pagehome__add" on:click={() => replacingbutton('Button')}>Add review</button>
    </div>
    <div class="slider-container">
      <div class="slider">
        <div class="slides">
          <div id="slides__1" class="slide">
            <div class="slides__alltext">
            <div class="slide__header">
                <h3 class="slide__name">Name</h3>
                <p class="slide__grade">2/5</p>
            </div>
                <button class="slide__button" id="slides__button1" on:click={() => replacing('Button1')}><p class="slides__text">fsverfvefsversfdverfsdvefsdv</p></button>
            </div>
            <a class="slide__prev" href="#slides__4" title="Next" />
            <a class="slide__next" href="#slides__2" title="Next" />
          </div>
          <div id="slides__2" class="slide">
            <div class="slides__alltext">
                <div class="slide__header">
                    <h3 class="slide__name">Name</h3>
                    <p class="slide__grade">3/5</p>
                </div>
                <button class="slide__button" on:click={() => replacing('Button2')}><p class="slides__text">fsverfvefsversfdverfsdvefsdv</p></button>
            </div>
            <a class="slide__prev" href="#slides__1" title="Prev" />
            <a class="slide__next" href="#slides__3" title="Next" />
          </div>
          <div id="slides__3" class="slide">
            <div class="slides__alltext">
                <div class="slide__header">
                    <h3 class="slide__name">Name</h3>
                    <p class="slide__grade">4/5</p>
                </div>
                <button class="slide__button" id="slides__button3" on:click={() => replacing('Button3')}><p class="slides__text">fsverfvefsversfdverfsdvefsdv</p></button>
            </div>
            <a class="slide__prev" href="#slides__2" title="Prev" />
            <a class="slide__next" href="#slides__4" title="Next" />
          </div>
          <div id="slides__4" class="slide">
            <div class="slides__alltext">
                <div class="slide__header">
                    <h3 class="slide__name">Name</h3>
                    <p class="slide__grade">2/5</p>
                </div>
                <button class="slide__button" id="slides__button4" on:click={() => replacing('Button4')}><p class="slides__text">fsverfvefsversfdverfsdvefsdv</p></button>
            </div>
            <a class="slide__prev" href="#slides__3" title="Prev" />
            <a class="slide__next" href="#slides__1" title="Prev" />
          </div>
        </div>
        <div class="slider__nav">
          <a class="slider__navlink" href="#slides__1" />
          <a class="slider__navlink" href="#slides__2" />
          <a class="slider__navlink" href="#slides__3" />
          <a class="slider__navlink" href="#slides__4" />
        </div>
      </div>
    </div>
  </div>
</div>
