package com.matthias.fintracker.configuration

import com.matthias._fintracker.base.BaseEntityRepository
import com.matthias._fintracker.base.BaseRepositoryConfiguration
import com.matthias.fintracker.PostgreSqlTestSpecification
import com.matthias.fintracker.common.jpa.PaginationRequest
import io.github.perplexhub.rsql.RSQLJPAAutoConfiguration
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import org.springframework.context.annotation.Import
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.TestPropertySource
import org.springframework.test.context.jdbc.Sql

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_METHOD

@DataJpaTest
@ActiveProfiles("test")
@TestPropertySource(properties = """
    spring.liquibase.enabled=false
    spring.jpa.hibernate.ddl-auto=none
""")
@Import([BaseRepositoryConfiguration, RSQLJPAAutoConfiguration])
@Sql(scripts = "/test-sql/base/init.sql", executionPhase = BEFORE_TEST_METHOD)
@Sql(scripts = "/test-sql/base/cleanup.sql", executionPhase = AFTER_TEST_METHOD)
class BaseRepositoryTest extends PostgreSqlTestSpecification {

    @Autowired
    BaseEntityRepository baseEntityRepository

    def "Should paginate data when sorted by date asc and name desc (deterministic)"() {
        given:
            def pageSize = 1
            def sort = "date,asc;name,desc"
            def filter = null

        when:
            def result = (0..9).collect {
                def request = new PaginationRequest(it, pageSize, sort, filter)
                baseEntityRepository.findAll(request).content
            }.collect { it.collect { it.id } }.flatten()

        then:
            result.size() == 10
            result == [9l, 8l, 2l, 1l, 0l, 3l, 5l, 4l, 7l, 6l]
    }

    def "Should paginate data when sorted by date asc (non-deterministic)"() {
        given:
            def pageSize = 1
            def sort = "date,asc;"
            def filter = null

        when:
            def result = (0..9).collect {
                def request = new PaginationRequest(it, pageSize, sort, filter)
                baseEntityRepository.findAll(request).content
            }.collect { it.collect { it.id } }.flatten()

        then:
            verifyAll(result) {
                size() == 10
                subList(0, 1) ==~ [9l]
                subList(1, 5) ==~ [8l, 2l, 1l, 0l]
                subList(5, 6) ==~ [3l]
                subList(6, 8) ==~ [4l, 5l]
                subList(8, 10) ==~ [6l, 7l]
            }
    }
}
