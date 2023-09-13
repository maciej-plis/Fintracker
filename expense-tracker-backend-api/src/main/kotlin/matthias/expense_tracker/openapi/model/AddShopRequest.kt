package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param name
 */
data class AddShopRequest(

    @Schema(example = "Walmart", required = true, description = "")
    @field:JsonProperty("name", required = true) val name: kotlin.String
) {

}

