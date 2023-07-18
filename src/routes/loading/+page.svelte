<script lang="ts">

</script>


<div class="loading__form-container">
    <p class="loading__text">Loading...</p>
    <div class="loading__container">
        <div class="progress2 progress-moved">
          <div class="progress-bar2">
          </div>
        </div>
      </div>
</div>

<style>

  .loading__text {
    font-size: 32px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    margin: 0;
    padding: 0;
  }

  .loading__form-container {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 14px 28px rgba(0,0,0,0.25), 0px 10px 10px rgba(0,0,0,0.22);
    width: 800px;
    padding: 40px;
    height: 200px;
    max-width: 100%;
    position: relative;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
  }

  .loading__container {
  margin: 50px auto;
  width: 600px;
  text-align: center;
}

.progress2 {
  padding: 6px;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.25),
    0 1px rgba(255, 255, 255, 0.08);
}

.progress-bar2 {
  height: 18px;
  border-radius: 30px;
  background-image: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.3),
    rgba(255, 255, 255, 0.05)
  );
  transition: 0.4s linear;
  transition-property: width, background-color;
}

.progress-moved .progress-bar2 {
  width: 99%;
  background-color: #ef476f;
  animation: progressAnimation 8s;
}

@keyframes progressAnimation {
  0% {
    width: 0%;
    background-color: #f9bcca;
  }
  90% {
    width: 90%;
    background-color: #eb6383;
  }
  99% {
    width: 99%;
    background-color: #ef476f;
  }
}

</style>

