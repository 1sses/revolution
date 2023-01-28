import { onMounted, onUnmounted, reactive } from 'vue';

export const useFullSpace = (aspectRatio: number) => {
  const sizes = reactive({
    width: '',
    height: '',
  });
  const computeSizes = () => {
    if (window.innerWidth / window.innerHeight > aspectRatio) {
      sizes.width = window.innerHeight * aspectRatio + 'px';
      sizes.height = window.innerHeight + 'px';
    } else {
      sizes.width = window.innerWidth + 'px';
      sizes.height = window.innerWidth / aspectRatio + 'px';
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
