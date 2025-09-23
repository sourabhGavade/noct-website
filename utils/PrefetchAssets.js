import { useEffect } from "react"

export default function PrefetchAssets() {

    useEffect(() => {
        prefetchFile('/images/services/services-digital.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/services/services-branding.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/services/services-digital.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/about/noct-studio-video-2.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/ideation-strategy-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/ideation-strategy-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/ideation-strategy-c.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/immersion-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/immersion-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/immersion-c.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/design-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/design-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/design-c.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/research-discovery-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/research-discovery-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/research-discovery-c.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/dev-support-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/dev-support-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/testing-improvement-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/testing-improvement-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/ideation-strategy-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/ideation-strategy-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/ux/ideation-strategy-c.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/scope-definition-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/scope-definition-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/research-strategy-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/research-strategy-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/research-strategy-c.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/concept-ideation-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/concept-ideation-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/brand-identity-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/brand-identity-b.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/brand-collaterals-a.mp4', onSuccess, onProgress, onError)
        prefetchFile('/images/process/branding/brand-collaterals-b.mp4', onSuccess, onProgress, onError)
    }, [])

    const onSuccess = (url) => {
        
    }

    const onProgress = (percent) => {
        
    }

    const onError = () => {

    }
  
    const prefetchFile = (url, fetched_callback, progress_callback, error_callback) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true);
      xhr.responseType = "blob";
  
      xhr.addEventListener("load", function () {
          if (xhr.status === 200) {
              var URL = window.URL || window.webkitURL;
              var blob_url = URL.createObjectURL(xhr.response);
              fetched_callback(blob_url);
          } else {
              error_callback();
          }
      }, false);
  
      var prev_pc = 0;
      xhr.addEventListener("progress", function (event) {
          if (event.lengthComputable) {
              var pc = Math.round((event.loaded / event.total) * 100);
              if (pc != prev_pc) {
                  prev_pc = pc;
                  progress_callback(pc);
              }
          }
      });
      xhr.send();
    }

    return (
        <>
        </>
    )
}