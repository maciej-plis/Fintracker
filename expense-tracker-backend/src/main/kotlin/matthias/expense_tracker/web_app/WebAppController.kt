package matthias.expense_tracker.web_app

import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class WebAppController : ErrorController {

    @GetMapping("/app/**", "/error")
    fun app(): String {
        return "forward:/index.html";
    }
}