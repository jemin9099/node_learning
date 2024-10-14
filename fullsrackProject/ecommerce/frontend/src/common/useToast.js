import { toast } from 'vue3-toastify'

const config = {
    autoClose: 1500,
    pauseOnHover: true,
    pauseOnFocusLoss: false,
    dangerouslyHTMLString: false,
    hideProgressBar: false,
  }

  export const useToast = () => {
  
    const toastTypeDefault = (msg) => {
      toast(msg, {
        ...config,
      })
    }
  
    const toastTypeInfo = (msg) => {
      toast(msg, {
        ...config,
        type: 'info',
      })
    }
  
    const toastTypeSuccess = (msg) => {
      toast(msg, {
        ...config,
        type: 'success',
      })
    }
  
    const toastTypeWarning = (msg) => {
      toast(msg, {
        ...config,
        type: 'warning',
      })
    }
  
    const toastTypeError = (msg) => {
      toast(msg, {
        ...config,
        type: 'error',
      })
    }
  
    return { toastTypeDefault, toastTypeInfo, toastTypeSuccess, toastTypeWarning, toastTypeError }
  
  }