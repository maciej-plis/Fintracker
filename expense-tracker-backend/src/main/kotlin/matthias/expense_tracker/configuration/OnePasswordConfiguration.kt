package matthias.expense_tracker.configuration

import com.sanctionco.opconnect.OPConnectClient
import org.springframework.beans.factory.getBeanNamesForType
import org.springframework.beans.factory.support.BeanDefinitionBuilder
import org.springframework.beans.factory.support.BeanDefinitionRegistry
import org.springframework.beans.factory.support.BeanDefinitionRegistryPostProcessor
import org.springframework.beans.factory.support.DefaultListableBeanFactory
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.boot.context.properties.bind.Binder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Profile
import org.springframework.core.env.ConfigurableEnvironment
import org.springframework.core.env.Environment

@Profile("!it")
@Configuration
@EnableConfigurationProperties(OnePasswordProperties::class)
class OnePasswordConfiguration {

    @Bean
    fun onePasswordPostProcessor(environment: ConfigurableEnvironment) =
        OnePasswordPostProcessor(environment)
}

class OnePasswordPostProcessor(environment: Environment) : BeanDefinitionRegistryPostProcessor {

    private val properties = bindOnePasswordProperties(environment)
    private val client = OPConnectClient.builder()
        .withEndpoint(properties.endpoint)
        .withAccessToken(properties.accessToken)
        .build()

    override fun postProcessBeanDefinitionRegistry(registry: BeanDefinitionRegistry) {
        registerDataSourceProperties(registry)
    }

    private fun registerDataSourceProperties(registry: BeanDefinitionRegistry) {
        removeExistingDataSourcePropertyBeans(registry)
        properties.dataSources.forEach {
            val beanName = it.name ?: DataSourceProperties::class.simpleName!!
            val beanDefinition = BeanDefinitionBuilder
                .genericBeanDefinition(DataSourceProperties::class.java) { it.toDataSourceProperties() }
                .setPrimary(it.primary ?: false)
                .beanDefinition

            registry.registerBeanDefinition(beanName, beanDefinition)
        }
    }

    private fun removeExistingDataSourcePropertyBeans(registry: BeanDefinitionRegistry) {
        (registry as DefaultListableBeanFactory).apply {
            getBeanNamesForType<DataSourceProperties>().forEach {
                removeBeanDefinition(it)
            }
        }
    }

    private fun OnePasswordItemProperties.toDataSourceProperties(): DataSourceProperties {
        val vaultClient = client.getVaultClient(vault)
        val vaultItem = vaultClient.getItem(item).get()
        val fieldValues = vaultItem.fields.associate { it.label to it.value }

        val connection = fieldValues.getValue("connection")
        val server = fieldValues.getValue("server")
        val port = fieldValues.getValue("port")
        val databaseName = fieldValues.getValue("database")
        val driver = fieldValues.getValue("driver")
        val username = fieldValues.getValue("username")
        val password = fieldValues.getValue("password")

        return DataSourceProperties().apply {
            this.url = "${connection}://${server}:${port}/${databaseName}"
            this.driverClassName = driver
            this.username = username
            this.password = password
        }
    }

    private fun bindOnePasswordProperties(environment: Environment): OnePasswordProperties =
        Binder.get(environment).bind("one-password", OnePasswordProperties::class.java).get()
}

@ConfigurationProperties("one-password")
data class OnePasswordProperties(
    val endpoint: String,
    val accessToken: String,
    val dataSources: List<OnePasswordItemProperties>
)

data class OnePasswordItemProperties(
    val name: String?,
    val primary: Boolean?,
    val vault: String,
    val item: String
)
