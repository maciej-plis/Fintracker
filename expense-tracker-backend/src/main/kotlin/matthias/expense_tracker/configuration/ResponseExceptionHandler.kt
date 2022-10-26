package matthias.expense_tracker.configuration

import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus.CONFLICT
import org.springframework.http.HttpStatus.NOT_FOUND
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler
import javax.persistence.EntityExistsException
import javax.persistence.EntityNotFoundException

@ControllerAdvice
internal class ResponseExceptionHandler : ResponseEntityExceptionHandler() {

    @ExceptionHandler(EntityExistsException::class)
    fun handleConflict(ex: EntityExistsException, request: WebRequest): ResponseEntity<Any> {
        return handleExceptionInternal(ex, "Conflict (403)", HttpHeaders(), CONFLICT, request)
    }

    @ExceptionHandler(EntityNotFoundException::class)
    fun handleNotFound(ex: EntityNotFoundException, request: WebRequest): ResponseEntity<Any> {
        return handleExceptionInternal(ex, "Not Found (404)", HttpHeaders(), NOT_FOUND, request)
    }
}