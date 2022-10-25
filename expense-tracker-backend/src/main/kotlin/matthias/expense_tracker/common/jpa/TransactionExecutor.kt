package matthias.expense_tracker.common.jpa

import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation.REQUIRED
import org.springframework.transaction.annotation.Propagation.REQUIRES_NEW
import org.springframework.transaction.annotation.Transactional

@Service
class TransactionExecutor {

    @Transactional(propagation = REQUIRED)
    fun <T> executeInTx(action: () -> T): T {
        return action.invoke();
    }

    @Transactional(propagation = REQUIRES_NEW)
    fun <T> executeInNewTx(action: () -> T): T {
        return action.invoke();
    }
}