package com.matthias.fintracker.category


import org.springframework.stereotype.Repository

@Repository
interface TestCategoryRepository extends CategoryRepository {

    CategoryEntity findByName(String name)
}
