import { onMounted, onUnmounted, reactive } from 'vue';

export const useFullSpace = (aspectRatio: number) => {
  const sizes = reactive({
    width: '',
    height: '',
  });
  const computeSizes = () => {
    // const windowWidth = window.innerWidth;
    // const windowHeight = window.innerHeight;
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    if (windowWidth / windowHeight > aspectRatio) {
      sizes.width = windowHeight * aspectRatio + 'px';
      sizes.height = windowHeight + 'px';
    } else {
      sizes.width = windowWidth + 'px';
      sizes.height = windowWidth / aspectRatio + 'px';
    }
  };
  onMounted(() => {
    computeSizes();
    window.addEventListener('resize', computeSizes);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', computeSizes);
  });

  return { sizes, computeSizes };
};
