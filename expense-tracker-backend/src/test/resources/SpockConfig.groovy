import static org.spockframework.runtime.model.parallel.ExecutionMode.CONCURRENT
import static org.spockframework.runtime.model.parallel.ExecutionMode.SAME_THREAD

runner {
    parallel {
        enabled true
        defaultSpecificationExecutionMode CONCURRENT
        defaultExecutionMode SAME_THREAD
    }
}
