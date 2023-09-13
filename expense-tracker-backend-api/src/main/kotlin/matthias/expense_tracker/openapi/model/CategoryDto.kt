package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param id
 * @param name
 */
data class CategoryDto(

    @Schema(example = "d964b4b3-ba2d-430d-9695-7d5d9c7b9382", required = true, description = "")
    @field:JsonProperty("id", required = true) val id: java.util.UUID,

    @Schema(example = "Food", required = true, description = "")
    @field:JsonProperty("name", required = true) val name: kotlin.String
) {

}

