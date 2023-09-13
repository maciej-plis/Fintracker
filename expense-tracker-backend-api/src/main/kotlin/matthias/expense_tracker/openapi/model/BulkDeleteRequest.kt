package matthias.expense_tracker.openapi.model

import java.util.Objects
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.v3.oas.annotations.media.Schema

/**
 *
 * @param ids
 */
data class BulkDeleteRequest(

    @Schema(example = "null", required = true, description = "")
    @field:JsonProperty("ids", required = true) val ids: kotlin.collections.List<java.util.UUID>
) {

}

